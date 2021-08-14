import { ref } from "vue"
import { db, ts, storage } from "./fireConf"

const stockFuncs = () => {
    const feature = ref<any>({
        text: '',
    })
    const features = ref<any>([])
    const tgVisitors = ref<any>([])
    const suggestion = ref<any>({
        stock: '',
    })
    const suggestions = ref<any>([])
    const suggestionSent = ref<boolean>(false)
    const stocks = ref<any>([])
    const stock = ref<any>({
        ticker: '',
        sector: {
            name: '',
            color: '',
        },
        recommendation: {
            text: '',
            comment: '',
            show: false,
        },
        logo: '',
        tradingView: '',
        highLows: {
            color: '',
            text: '',
            num: 1,
        },
        smaEma: {
            color: '',
            text: '',
            num: 1,
        },
        accum: {
            color: '',
            text: '',
            num: 1,
        },
        adx: {
            color: '',
            text: '',
            num: 1,
        },
        fwd: {
            color: '',
            text: '',
            num: 1,
            comment: '',
        },
        debtEquity: {
            color: '',
            text: '',
            num: 1,
            comment: '',
        },
        currentRatio: {
            color: '',
            text: '',
            num: 1,
            comment: '',
        },
        peg: {
            color: '',
            text: '',
            comment: '',
        },
        growth: {
            color: '',
            text: '',
            num: 1,
            comment: '',
        },
        competition: {
            color: '',
            text: '',
            num: 1,
            comment: '',
        },
        priceGrowth: {
            color: '',
            text: '',
            num: 1,
            comment: '',
        },
        report: {
            color: '',
            text: '',
            num: 1,
            comment: '',
        },
        levels: {
            color: '',
            text: '',
            num: 1,
        },
        fibo: {
            color: '',
            text: '',
            num: 1,
        },
        stoch: {
            color: '',
            text: '',
            num: 1,
        },
        pattern: {
            color: '',
            text: '',
            num: 1,
        },
        trendSum: {
            color: '',
            text: '',
        },
        techSum: {
            color: '',
            text: '',
        },
        fundSum: {
            color: '',
            text: '',
        },
        contextSum: {
            color: '',
            text: '',
        },
        minmax: {
            color: '',
            text: '',
        },
        sliders: {
            color: '',
            text: '',
        },
        nakopleniye: {
            color: '',
            text: '',
        },
        trendPower: {
            color: '',
            text: '',
        },
        dynamics: {
            color: '',
            text: '',
        },
        scenarios: [],
        news: [],
    })

    const file = ref(null)

    const getStocks = () => {
        db.collection("stocks").orderBy("createdAt", "desc").onSnapshot(item => {
            stocks.value = item.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
            })
        })
    }

    const getSuggestions = () => {
        db.collection("suggestions").orderBy("createdAt", "desc").onSnapshot(item => {
            suggestions.value = item.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
            })
        })
    }

    const getTgVisitors = () => {
        db.collection("tgVisitors").orderBy("createdAt", "desc").onSnapshot(item => {
            tgVisitors.value = item.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
            })
        })
    }

    const getFeatures = () => {
        db.collection("features").orderBy("createdAt", "desc").onSnapshot(item => {
            features.value = item.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
            })
        }) 
    }

    const getStock = (id: string) => {
        const stocks = db.collection("stocks").doc(id)
        stocks.get().then((doc) => {
            if (doc.exists) {
                stock.value = doc.data()
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    const embedChart = (id: string) => {
        const stocks = db.collection("stocks").doc(id)
        stocks.get().then((doc) => {
            if (doc.exists) {
                const data: any = doc.data()
                const tvid = data.tradingView
                new TradingView.chart({
                    "chart": tvid,
                    "container_id": "tv",
                    "autosize": true,
                })

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    const getStockTV = (id: string) => {
        const stocks = db.collection("stocks").doc(id)
        stocks.get().then((doc) => {
            if (doc.exists) {
                const data: any = doc.data()
                const ticker = data.ticker
                new TradingView.widget({
                        "autosize": true,
                        "symbol": ticker,
                        "interval": "D",
                        "timezone": "Etc/UTC",
                        "theme": "light",
                        "style": "1",
                        "locale": "en",
                        "toolbar_bg": "#f1f3f6",
                        "enable_publishing": false,
                        "hide_top_toolbar": true,
                        "save_image": false,
                        "studies": [
                            "MAExp@tv-basicstudies",
                            "Stochastic@tv-basicstudies",
                        ],
                        "container_id": "tv",
                    },
                )
                console.log("Initialized TV with ticker: ", ticker)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    const addStock = () => {
        db.collection("stocks").add({
            ticker: stock.value.ticker,
            sector: stock.value.sector,
            recommendation: stock.value.recommendation,
            logo: stock.value.logo,
            tradingView: stock.value.tradingView,
            highLows: stock.value.highLows,
            smaEma: stock.value.smaEma,
            accum: stock.value.accum,
            adx: stock.value.adx,
            fwd: stock.value.fwd,
            debtEquity: stock.value.debtEquity,
            currentRatio: stock.value.currentRatio,
            peg: stock.value.peg,
            growth: stock.value.growth,
            competition: stock.value.competition,
            priceGrowth: stock.value.priceGrowth,
            report: stock.value.report,
            levels: stock.value.levels,
            fibo: stock.value.fibo,
            stoch: stock.value.stoch,
            pattern: stock.value.pattern,
            trendSum: stock.value.trendSum,
            fundSum: stock.value.fundSum,
            techSum: stock.value.techSum,
            contextSum: stock.value.contextSum,
            scenarios: stock.value.scenarios,
            minmax: stock.value.minmax,
            sliders: stock.value.sliders,
            nakopleniye: stock.value.nakopleniye,
            trendPower: stock.value.trendPower,
            dynamics: stock.value.dynamics,
            news: stock.value.news,
            createdAt: ts
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error: Error) => {
            console.error("Error adding document: ", error);
        });
    }

    const addSuggestion = () => {
        db.collection("suggestions").add({
            stock: suggestion.value.stock,
            createdAt: ts
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            suggestionSent.value = true
            setTimeout(() => {
               suggestionSent.value = false 
            }, 2000);
        })
        .catch((error: Error) => {
            console.error("Error adding document: ", error);
        });
    }

    const addTgVisitor = () => {
        const urlSearchParams: any = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        if (Object.keys(params).length !== 0) {
            db.collection("tgVisitors").add({
                userid: params.userid || 'empty',
                name: params.name || 'empty',
                usernik: params.usernik || 'empty',
                createdAt: ts,
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error: Error) => {
                console.error("Error adding document: ", error);
            });
        }
        
    }

    const addFeature = () => {
        db.collection("features").add({
            feature: feature.value,
            createdAt: ts
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            feature.value.text = ''
        })
        .catch((error: Error) => {
            console.error("Error adding document: ", error);
        });
    }

    const updateStock =  (id: string) => {
        db.collection("stocks").doc(id).update(stock.value)
    }

    const deleteFeature = (id: string) => {
        db.collection("features").doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        }); 
    }

    const deleteStock = (id: string) => {
        db.collection("stocks").doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    const deleteSuggestion = (id: string) => {
        db.collection("suggestions").doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    const deleteTgVisitor = (id: string) => {
        db.collection("tgVisitors").doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
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
            stock.value.logo = await res.ref.getDownloadURL()
        } catch(err) {
            console.log(err)
        }
    }

    return { feature, features, getFeatures, addFeature, deleteFeature, getTgVisitors, addTgVisitor, deleteTgVisitor, tgVisitors, embedChart, suggestions, suggestion, addSuggestion, deleteSuggestion, getSuggestions, suggestionSent, handleChange, uploadImage, file, stocks, stock, getStocks, getStock, getStockTV, addStock, updateStock, deleteStock }
}

export default stockFuncs