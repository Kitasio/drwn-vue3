import { ref } from "vue"
import { auth, storage, db } from "./fireConf"

const authFuncs = () => {
    const user = ref<any>('')
    const dbUser = ref<any>('')
    const file = ref(null)
    const passwordUpdated = ref(false)
    const passwordUpdatedError = ref(false)

    const getUser = () => {
        auth.onAuthStateChanged(u => {
            if (u) {
                user.value = u
                const docRef = db.collection('users').doc(u.uid)
                docRef.get().then(doc => {
                    if (doc.exists) {
                        dbUser.value = doc.data()
                    }
                })
            }
        })
    }

    const hasAccess = () => {
        if (user.value.email == 'admin@drwn.biz') {
            return user
        }

        if (dbUser.value.subscriptionUpdated) {
            // var options: any = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            let expiration = new Date((dbUser.value.subscriptionUpdated.seconds + (3600 * 24)) * 1000)
            expiration.setMonth(expiration.getMonth() + 1)
            let today = new Date();
            console.log(expiration)

            

            if (today > expiration) {
                console.log("send request to cloudpayments and update the timestamp and subscribtion to false if not active")
                // if status != active then DELETE the dbUser.value.subscriptionUpdated AND set dbUser.value.subscriber to false
            } else {
                return dbUser.value.subscriber
            }
        }
    }

    const updateName = (userName: string) => {
        const user = auth.currentUser
        if (user) {
            user.updateProfile({
                displayName: userName,
            })
            .then(() => {
                console.log("Update successful")
            }).catch((error) => {
                console.log(error)
            }); 
        }
    }

    const newPassword = (pass: string) => {
        const user = auth.currentUser
        if (user) {
            user.updatePassword(pass)
            .then(() => passwordUpdated.value = true)
            .catch((error) => passwordUpdatedError.value = true)
        }
    }

    const logout = () => {
        auth.signOut().then(() => {
            console.log("Sign-out successful.")
        }).catch((error) => {
            console.log(error)
        });
    }

    const handleChange = (e: any) => {
        // allowed file types
        const types = ['image/png', 'image/jpeg']

        // selected file
        const selected = e.target.files[0]
        console.log(selected)

        if (selected && types.includes(selected.type)) {
            file.value = selected
            uploadImage(file.value)
            // this.doc.imgName = selected.name
        } else {
            file.value = null
        }
    }
    

    const uploadImage = async (file: any) => {
        const filePath = `avatars/${file.name}`
        const storageRef = storage.ref(filePath)

        try {
            const res = await storageRef.put(file)
        //   this.doc.imgPath = filePath
            user.value.photoURL = await res.ref.getDownloadURL()
        } catch(err) {
            console.log(err)
        }
    }

    return {
        user,
        dbUser,
        getUser,
        handleChange,
        updateName,
        logout,
        newPassword,
        passwordUpdated,
        passwordUpdatedError,
        hasAccess,
    }
}

export default authFuncs