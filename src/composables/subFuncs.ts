import { ref } from "vue"
import { db, ts, storage } from "./fireConf"

const subFuncs = () => {
    const subs = ref<any>([])
    const sub = ref<any>(
        {
            ticker: '',
            email: '',
        },
    )

    const addSub = () => {
        db.collection('subscriptions').add({
            sub: sub.value,
            createdAt: ts,
        })
    }

    const getSubs = () => {
        db.collection("subscriptions").orderBy("createdAt", "desc").onSnapshot(item => {
            subs.value = item.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
            })
        })
    }

    const getSub = (id: string) => {
        const subs = db.collection("subscriptions").doc(id)
        subs.get().then((doc) => {
            if (doc.exists) {
                sub.value = doc.data()
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    const deleteSub = (id: string) => {
        db.collection("subscriptions").doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    return {
        sub,
        subs,
        addSub,
        getSub,
        getSubs,
        deleteSub,
    }
}

export default subFuncs