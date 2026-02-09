
from app import create_app, db
from app.models.customer import Customer
from app.config import Config

app = create_app()
with app.app_context():
    target_storage = Config.MAX_USER_STORAGE
    print(f"Target storage: {target_storage}")
    users = Customer.query.all()
    count = 0
    for u in users:
        # Update if less than target
        if u.total_storage < target_storage:
            print(f"Updating user {u.email} from {u.total_storage} to {target_storage}")
            u.total_storage = target_storage
            count += 1
    db.session.commit()
    print(f"Updated {count} users.")
