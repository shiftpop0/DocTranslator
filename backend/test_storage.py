
import uuid
import sys
import os

# Add /app to sys.path just in case, though it should be there
sys.path.append('/app')

from app import create_app, db
from app.models.customer import Customer
from app.config import Config

app = create_app()
with app.app_context():
    print(f'Config.MAX_USER_STORAGE: {Config.MAX_USER_STORAGE}')
    
    # Check what os.getenv sees
    print(f'os.getenv("MAX_USER_STORAGE"): {os.getenv("MAX_USER_STORAGE")}')

    email = f'test_{uuid.uuid4().hex[:8]}@local.com'
    u = Customer(email=email, password='pwd', name='test')
    db.session.add(u)
    db.session.commit()
    
    print(f'User {email} storage: {u.total_storage}')
    print(f'Expected: {1024*1024*1024}')
    
    db.session.delete(u)
    db.session.commit()
