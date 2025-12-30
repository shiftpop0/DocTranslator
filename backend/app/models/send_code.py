from datetime import datetime
from app import db


class SendCode(db.Model):
    """ 验证码发送记录表 """
    __tablename__ = 'send_code'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer)
    send_type = db.Column(db.Integer, nullable=False)
    send_to = db.Column(db.String(100), nullable=False)
    code = db.Column(db.String(6), nullable=False)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)