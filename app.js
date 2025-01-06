// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDhIiiMjDnKIUymUUqgk12JdWqeUKE2bIE",
    authDomain: "database-cb38f.firebaseapp.com",
    databaseURL: "https://database-cb38f-default-rtdb.firebaseio.com/",
    projectId: "database-cb38f",
    storageBucket: "database-cb38f.firebasestorage.app",
    messagingSenderId: "589241711085",
    appId: "1:589241711085:web:4cf6ba6123ea4747014fe4",
    measurementId: "G-6Q9Z4VV94Y"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  const auth = firebase.auth(); // Initialize Firebase Authentication
  
  // Reference to the data list in the database
  const dataListRef = database.ref('dataList');
  
  // Login form functionality
  const loginForm = document.getElementById('loginForm');
  const loginSection = document.getElementById('loginSection');
  const dataListSection = document.getElementById('dataListSection');
  
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User logged in');
        loginSection.style.display = 'none';
        dataListSection.style.display = 'block';
      })
      .catch((error) => {
        console.error('Login error:', error.message);
        alert('Login failed: ' + error.message);
      });
  });
  
  // Logout button functionality
  const logoutButton = document.getElementById('logoutButton');
  logoutButton.addEventListener('click', () => {
    auth.signOut()
      .then(() => {
        console.log('User logged out');
        loginSection.style.display = 'block';
        dataListSection.style.display = 'none';
      })
      .catch((error) => {
        console.error('Logout error:', error.message);
      });
  });
  
  // Function to display data from Firebase
  function displayData(snapshot) {
    const dataListElement = document.getElementById('dataList');
    dataListElement.innerHTML = ''; // Clear existing data
  
    snapshot.forEach((childSnapshot) => {
      const listItem = document.createElement('li');
      listItem.textContent = childSnapshot.val();
      dataListElement.appendChild(listItem);
    });
  }
  
  // Listen for changes in the data list and update UI
  dataListRef.on('value', displayData);
  
  // Check authentication state
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log('User is logged in');
      loginSection.style.display = 'none';
      dataListSection.style.display = 'block';
    } else {
      console.log('User is logged out');
      loginSection.style.display = 'block';
      dataListSection.style.display = 'none';
    }
  });
  
