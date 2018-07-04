# Private chat
This is a simple chat written on Python and JavaScript.

## Hot to use it

### Backend

Create and activate virtual environment.

##### Linux or Mac OS
```bash
cd backend
virtualenv venv -p python3
source venv/bin/activate
```

##### Windows
```bash
cd backend
virtualenv venv
venv\Scripts\activate.bat
```

Install the requirements, then run migrations, create a superuser and finally start the development server.
```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

