import { ref } from "vue"
import { auth, storage } from "./fireConf"

const authFuncs = () => {
    const user = ref<any>(null)
    const file = ref(null)

    const getUser = () => {
        auth.onAuthStateChanged(u => {
            if (u) {
                user.value = u
            }
        })
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
        const filePath = `icons/${file.name}`
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
        getUser,
        handleChange,
        updateName,
        logout,
    }
}

export default authFuncs