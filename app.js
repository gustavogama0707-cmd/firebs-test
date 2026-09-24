
const firebaseConfig = {
  apiKey: "AIzaSyAYeKag5uN-YcqDzscoFGBvIAZM2MZLmWg",
  authDomain: "senai-teste-8a67c.firebaseapp.com",
  projectId: "senai-teste-8a67c",
  storageBucket: "senai-teste-8a67c.firebasestorage.app",
  messagingSenderId: "1070542418267",
  appId: "1:1070542418267:web:b38b35ee1e4efa76e72a7e"

};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ experimentalForceLongPolling: true });

async function addData() {
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;

  try {
    const docRef = await db.collection('users').add({
      name: name,
      age: Number.parseInt(age, 10)
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
}

async function getData() {
  try {
    const querySnapshot = await db.collection('users').get();
    const dataList = document.getElementById('data-list');
    dataList.innerHTML = '';

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const listItem = document.createElement('li');
      listItem.textContent = `${data.name}, ${data.age}`;
      dataList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
}

window.addData = addData;
window.getData = getData;
