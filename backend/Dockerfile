# Use official Python runtime as base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    build-essential \
    cmake \
    libopenblas-dev \
    liblapack-dev \
    libx11-dev \
    libgtk-3-dev \
    libpng-dev \
    libjpeg-dev \
    libatlas-base-dev \
    gfortran \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy project files (including entrypoint.sh)
COPY . .

# Create non-root user for Celery
RUN useradd -m -r -u 1000 celeryuser && chown celeryuser:celeryuser /app

# Expose port
EXPOSE 8000

# Use the entrypoint script
ENTRYPOINT ["./entrypoint.sh"]