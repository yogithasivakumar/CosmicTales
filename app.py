from flask import Flask, render_template, redirect, url_for, session, request

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Landing page
@app.route('/')
def index():
    return render_template('index.html')

# Signup page
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        # Here you can save user info
        return redirect(url_for('login'))
    return render_template('signup.html')

# Login page
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        session['user'] = request.form.get('username')
        return redirect(url_for('dashboard'))
    return render_template('login.html')

# Dashboard
@app.route('/dashboard')
def dashboard():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('dashboard.html')

@app.route('/farmer')
def farmer():
    pages = [
        {"id": 1, "text": "Hi! My GPS tractor helps me water crops and plant seeds on time!"},
        {"id": 2, "text": "Oh no! My radio crackles. Communication with the tower is weak!"},
        # add all pages here
    ]
    return render_template("farmer.html", pages=pages)

@app.route('/pilot')
def pilot():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('pilot.html')


# Logout
@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return '', 200

if __name__ == '__main__':
    app.run(debug=True)
