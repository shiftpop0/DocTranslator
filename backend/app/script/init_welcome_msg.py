import sys
import os

# Add the project root directory to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))

from app import create_app, db
from app.models.setting import Setting

app = create_app()

with app.app_context():
    setting = Setting.query.filter_by(alias='welcome_message').first()
    if not setting:
        setting = Setting(
            alias='welcome_message',
            value='Welcome！请勿处理涉密信息',
            group='site',
            serialized=False
        )
        db.session.add(setting)
        print("Added welcome_message setting.")
    else:
        setting.value = 'Welcome！请勿处理涉密信息'
        print("Updated welcome_message setting.")
        
    # Color
    setting_color = Setting.query.filter_by(alias='welcome_message_color').first()
    if not setting_color:
        setting_color = Setting(alias='welcome_message_color', value='red', group='site', serialized=False)
        db.session.add(setting_color)
        print("Added welcome_message_color setting.")
    
    # Size
    setting_size = Setting.query.filter_by(alias='welcome_message_size').first()
    if not setting_size:
        setting_size = Setting(alias='welcome_message_size', value='24px', group='site', serialized=False)
        db.session.add(setting_size)
        print("Added welcome_message_size setting.")
    
    db.session.commit()
