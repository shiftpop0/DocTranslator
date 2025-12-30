# translate/db.py
import sqlite3
from urllib.parse import urlparse
import logging
from contextlib import contextmanager
from threading import Lock

import pymysql
import os
from dotenv import load_dotenv, find_dotenv

_ = load_dotenv(find_dotenv())

# 全局锁
_db_lock = Lock()


def get_conn():
    """获取数据库连接"""
    try:
        db_url = os.environ.get('PROD_DATABASE_URL')
        if not db_url:
            raise ValueError("Database URL not found in environment variables.")

        # SQLite
        if db_url.startswith('sqlite:///'):
            sqlite_db_path = db_url[len('sqlite:///'):]
            conn = sqlite3.connect(sqlite_db_path, check_same_thread=False)
            conn.row_factory = sqlite3.Row
            return conn

        # MySQL
        elif db_url.startswith('mysql+pymysql://'):
            parsed_url = urlparse(db_url)
            conn = pymysql.connect(
                host=parsed_url.hostname,
                port=parsed_url.port or 3306,
                user=parsed_url.username,
                password=parsed_url.password,
                db=parsed_url.path.lstrip('/'),
                charset='utf8mb4',
                cursorclass=pymysql.cursors.DictCursor,
                autocommit=True
            )
            return conn

        else:
            raise ValueError(f"Unsupported database URL: {db_url}")

    except Exception as e:
        logging.error(f"Database connection error: {e}")
        raise


@contextmanager
def get_connection():
    """上下文管理器获取连接"""
    conn = None
    try:
        conn = get_conn()
        yield conn
    finally:
        if conn:
            try:
                conn.close()
            except:
                pass


def execute(sql: str, *params) -> bool:
    """
    执行SQL语句（INSERT/UPDATE/DELETE）
    :return: 是否成功
    """
    with _db_lock:
        try:
            with get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(sql, params)
                conn.commit()
                cursor.close()
                return True
        except Exception as e:
            logging.error(f"SQL execute error: {e}, SQL: {sql}")
            return False


def get(sql: str, *params) -> dict:
    """
    查询单条记录
    :return: 字典或空字典
    """
    with _db_lock:
        try:
            with get_connection() as conn:
                cursor = conn.cursor()
                if isinstance(cursor, sqlite3.Cursor):
                    # SQLite
                    cursor.execute(sql, params)
                    row = cursor.fetchone()
                    if row:
                        columns = [desc[0] for desc in cursor.description]
                        return dict(zip(columns, row))
                    return {}
                else:
                    # MySQL
                    cursor.execute(sql, params)
                    result = cursor.fetchone()
                    cursor.close()
                    return result if result else {}
        except Exception as e:
            logging.error(f"SQL query error: {e}, SQL: {sql}")
            return {}


def get_all(sql: str, *params) -> list:
    """
    查询多条记录
    :return: 字典列表
    """
    with _db_lock:
        try:
            with get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(sql, params)
                results = cursor.fetchall()
                cursor.close()

                if isinstance(cursor, sqlite3.Cursor):
                    columns = [desc[0] for desc in cursor.description]
                    return [dict(zip(columns, row)) for row in results]
                return list(results) if results else []
        except Exception as e:
            logging.error(f"SQL query error: {e}, SQL: {sql}")
            return []
