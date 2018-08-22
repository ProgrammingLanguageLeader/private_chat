# Private chat
This is a simple chat written on Python and JavaScript.

## Hot to use it

### Backend

Create and activate virtual environment.

##### Linux or Mac OS
```bash
virtualenv venv -p python3
source venv/bin/activate
```

##### Windows
```bash
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

### Frontend

Install the dependencies
```bash
npm install
```

Run a build script
```bash
npm run build
```

Run the development server
```bash
npm start
```