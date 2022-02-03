import { useState, useEffect } from "react";
import initialiationFirebase from "../../Pages/Login/Firebase/Firebase.init";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, getIdToken } from "firebase/auth";

// initialiazation Firebase App

initialiationFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [token, setToken] = useState('');
    const [admin, setAdmin] = useState(false);
  
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

    const registerUser = (email, password, name, history) => {
      setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const newUser = { email, displayName: name };
    setUser(newUser);
    // save user to the database
    saveUser(email, name, 'POST');
    // send name to firebase after cration 
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
  
    }).catch((error) => {
      
    });
    history.replace('/');
    setAuthError('');
    logOut();
    // ...
  })
  .catch((error) => {
    setAuthError(error.message);
    // ..
  })
  .finally (() => setIsLoading(false));      
    }

    const loginUser = (email, password, history, location) => {
      setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
       .then((userCredential) => {
         const destination = location?.state?.from || '/';
         history.replace(destination);
         setAuthError('');
  })
  .catch((error) => {
    setAuthError(error.message);
  })
  .finally (() => setIsLoading(false));
  }
  
  const loginWithGoogle = (history, location) => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        saveUser(user.email, user.displayName, 'PUT');
    const destination = location?.state?.from || '/';
    history.replace(destination);
    setAuthError('');
  }).catch((error) => {
    setAuthError(error.message);
  }).finally (() => setIsLoading(false));

  }
// observe user state
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user);
              getIdToken(user)
                .then(idToken => {
                  setToken(idToken)
              })
              
            } else {
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unsubscribe;
    }, [auth])
  useEffect(() => {
    fetch(`http://localhost:5000/users/${user.email}`)
      .then(res => res.json())
      .then(data => setAdmin(data.admin))
  }, [user.email])

    const logOut = () => {
      setIsLoading(true)
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          })
          .finally (() => setIsLoading(false));
  }
  
  const saveUser = (email, displayName, method) => {
    const user = { email, displayName };
    fetch('http://localhost:5000/users', {
      method: method,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then()
  }
    return {
        user,
        admin,
        token,
        registerUser,
        loginUser,
        loginWithGoogle,
        logOut,
        isLoading,
        authError
    }
}


export default useFirebase;