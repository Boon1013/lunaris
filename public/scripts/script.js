const firebaseConfig = {
    apiKey: "AIzaSyCtSkJ1xXnYVGNThAbawhf8VOkMWCo3948",
    authDomain: "lunaris-users.firebaseapp.com",
    projectId: "lunaris-users",
    storageBucket: "lunaris-users.appspot.com",
    messagingSenderId: "570497066095",
    appId: "1:570497066095:web:f8672309f4b8af4d78599a",
    measurementId: "G-6ENGCED217",
	databaseURL: "https://lunaris-users-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const database = firebase.database()

function register () {
	username = document.getElementById("username").value
	email = document.getElementById("email").value
	password = document.getElementById("password").value
	dob = document.getElementById("dob").value
	
	if (validate_email(email) == false || validate_password(password) == false || validate_username(username) == false) {
		return
	}
	
	auth.createUserWithEmailAndPassword(email, password)
	.then(function() {
		var user = auth.currentUser
		
		var database_ref = database.ref()
		

		newUid().then(uid => {
			//console.log("test" + uid)

			var user_data = {
				email: email,
				username: username,
				creation: Date.now(),
				date_of_birth: dob,
				account_type: "player",
				userbadges: [0],
				friends: [0],
				following: [0],
				followers: [0],
				luna: 0,
				games: [0],
				favourites: [0],
				likes: [0],
				playerbadges: [0],
				groups: [0],
				last_login: Date.now()
			}

			database_ref.child('users/' + uid).set(user_data)
		})
		
	})
	.catch(function(error) {
		var error_code = error.code
		var error_message = error.message
		
		alert(error_message)
	})
}

function login() {
	email = document.getElementById("email").value
	password = document.getElementById("password").value
	
	if (validate_email(email) == false || validate_password(password) == false) {
		return
	}
	
	auth.signInWithEmailAndPassword(email, password)
	.then(function() {
		var user = auth.currentUser
		
		var database_ref = database.ref()
		
		var uid = 2
		
		var user_data = {
			last_login: Date.now()
		}
		
		database_ref.child('users/' + uid).update(user_data)
		alert("logged in")
	})
	.catch(function(error) {
		var error_code = error.code
		var error_message = error.message
		
		alert(error_message)
	})
}

async function newUid() {
	const dbRef = firebase.database().ref("users/last_uid");
	return dbRef.get().then((snapshot) => {
		if (snapshot.exists()) {
			//console.log(snapshot.val());
			var uid = snapshot.val().uid
			var newuid = uid + 1

			//console.log(newuid);

			dbRef.update({ uid: newuid });

			return newuid
		} else {
			console.log("No data available");
		}
	}).catch((error) => {
		console.error(error);
		alert(error)
	});
}

function validate_email(email) {
	expression = /^[^@]+@\w+(\.\w+)+\w$/
	if (expression.test(email) == true) {
		return true
	} else {
		return false
	}
}

function validate_password(password) {
	if (password < 6) {
		return false
	} else {
		return true
	}
}

function validate_username(field) {
	expression = /^[a-zA-Z0-9]*_?[a-zA-Z0-9]*$/
	if (field == null) {
		return false
	}
	
	if (field.length <= 0 || field.length >= 21) {
		return false
	} else {
		if (expression.test(field) == true) {
			return true
		} else {
			return false
		}
	}
}