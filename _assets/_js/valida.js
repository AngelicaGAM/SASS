
db.collection("usuarios").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.Estado} => ${doc.data()}`);
    });
});