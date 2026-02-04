# Base image
FROM python:3.10-slim

WORKDIR /app

# Copiar dependências
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copiar o resto da aplicação
COPY . .

# Expõe porta (exemplo 5000)
EXPOSE 5000

CMD ["python", "run.py"]
