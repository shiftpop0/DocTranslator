# 使用官方的 Python 3.11 镜像（基于 Debian 12 bookworm）
FROM python:3.11-bookworm

# 设置工作目录为/app
WORKDIR /app


RUN sed -i 's|http://deb.debian.org|https://mirrors.aliyun.com|g' /etc/apt/sources.list.d/debian.sources && \
    sed -i 's|http://security.debian.org|https://mirrors.aliyun.com|g' /etc/apt/sources.list.d/debian.sources

# 安装系统依赖
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    tesseract-ocr \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libfontconfig1 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 复制 backend 目录下的 requirements.txt
COPY requirements.txt .

# 安装 Python 依赖
RUN pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple

# 将整个 backend 目录复制到容器内的 /app
COPY . .

# 暴露端口（Flask 默认端口是 5000）
EXPOSE 5000

# 启动命令
CMD ["python", "app.py"]