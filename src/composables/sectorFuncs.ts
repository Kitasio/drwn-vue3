import { ref } from "vue"
import { db, ts, storage } from "./fireConf"

const sectorFuncs = () => {

    const sectors = ref<any>([])
    const sector = ref<any>({
        name: '',
        context: {
            text: '',
            color: '',
        },
        target: '',
        support: '',
        keyFactor: '',
        tradingView: '',
        scenarios: [],
        factors: [],
        cycle: {
            first: '',
            secod: '',
            third: '',
            shock: '',
        },
        news: [],
        fund: [
            {name: 'Price to Earnings (P/E)', nameRu: 'Соотношение цены компании к прибыли', param: '', change: '', potential: ''},
            {name: 'fwd P/E 2024', nameRu: 'Соотношение цены компании к прибыли, ожидаемой в 2024 году', param: '', change: '', potential: ''},
            {name: 'P/E 2019 к P/E2024', nameRu: 'Соотношение Цены к прибыли компании в 2019 и 2024 годах', param: '', change: '', potential: ''},
            {name: 'Earnings surprise rate', nameRu: 'Доля Отчетов, превзошедших ожидания', param: '', change: '', potential: ''},
            {name: 'Гэпы вверх на отчетах', nameRu: 'Гэпы вверх на отчетах', param: '', change: '', potential: ''},
            {name: 'Price to free Cash flow (P/FCF)', nameRu: 'Цена компании к денежному потоку', param: '', change: '', potential: ''},
            {name: 'Debt to Equity', nameRu: 'Долг к капиталу', param: '', change: '', potential: ''},
            {name: 'Темпы роста выручки 2019 к 2024', nameRu: 'Темпы роста выручки 2019 к 2024', param: '', change: '', potential: ''},
            {name: 'Open Interest', nameRu: 'Цель по опционам', param: '', change: '', potential: ''},
            {name: 'Tipranks', nameRu: 'Цель топ-аналитиков', param: '', change: '', potential: ''},
        ],
        tech: [
            {name: 'Уровни', nameRu: 'Целевые уровни', param: '', change: '', potential: ''},
            {name: 'Fibo', nameRu: 'Уровни Фибоначчи', param: '', change: '', potential: ''},
            {name: 'Stoch', nameRu: 'Перекупленность', param: '', change: '', potential: ''},
            {name: 'Pattern', nameRu: 'Свечной паттерн', param: '', change: '', potential: ''},
            {name: 'Highs-lows', nameRu: 'Максимумы/минимумы ', param: '', change: '', potential: ''},
            {name: 'Sma-Ema', nameRu: 'Скользящие средние', param: '', change: '', potential: ''},
            {name: 'Accum/Dist', nameRu: 'Накопление позиций', param: '', change: '', potential: ''},
            {name: 'ADX', nameRu: 'Сила тренда', param: '', change: '', potential: ''},
        ],
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
    })

    const ideaChart = (id: string) => {
        const sectors = db.collection("sectors").doc(id)
        sectors.get().then((doc) => {
            if (doc.exists) {
                const data: any = doc.data()
                const tvid = data.tradingView
                new TradingView.chart({
                    "chart": tvid,
                    // "height": "700",
                    // "width": "100%",
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

    const addSector = () => {
        db.collection("sectors").add({
            name: sector.value.name,
            context: sector.value.context,
            target: sector.value.target,
            support: sector.value.support,
            keyFactor: sector.value.keyFactor,
            tradingView: sector.value.tradingView,
            scenarios: sector.value.scenarios,
            factors: sector.value.factors,
            cycle: sector.value.cycle,
            news: sector.value.news,
            fund: sector.value.fund,
            tech: sector.value.tech,
            techSum: sector.value.techSum,
            fundSum: sector.value.fundSum,
            contextSum: sector.value.contextSum,
            createdAt: ts,
        })
    }
    const getSectors = () => {
        db.collection("sectors").orderBy("createdAt", "desc").onSnapshot(item => {
            sectors.value = item.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
            })
        })
    }
    const getSector = (id: string) => {
        const sectors = db.collection("sectors").doc(id)
        sectors.get().then((doc) => {
            if (doc.exists) {
                sector.value = doc.data()
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }
    const deleteSector = (id: string) => {
        db.collection("sectors").doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
    const updateSector =  (id: string) => {
        db.collection("sectors").doc(id).update(sector.value)
    }

    return {
        sectors,
        sector,
        addSector,
        getSectors,
        getSector,
        deleteSector,
        updateSector,
        ideaChart,
    }
}
export default sectorFuncs