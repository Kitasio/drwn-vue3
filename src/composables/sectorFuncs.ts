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
        {name: 'Price to Earnings (P/E)', nameRu: 'Соотношение цены компании к прибыли', param: '', paramColor: '', change: '', potential: '', tooltip: '"Измеряется как капитализация компании по текущей цене акций деленная на прибыль текущего года: Price to Earnings (P/E)"'},
            {name: 'fwd P/E 2024', nameRu: 'Соотношение цены компании к будущей прибыли', param: '', paramColor: '', change: '', potential: '', tooltip: '"Измеряется как капитализация компании по текущей цене акций деленная на прибыль ожидаемую в 2024 году: fwd P/E 2024"'},
            {name: 'P/E 2019 к P/E2021', nameRu: 'Соотношение Цены к прибыли компании в 2019 и 2021 годах', param: '', paramColor: '', change: '', potential: '', tooltip: '"Показатель учитывает оценку компании в 2019 году - капитализация компании на 31.12.2019 к прибыли за 2019, а также форвардную оценку текущей капитализации к прибыли ожидаемой в 2021 году. Задача показателя оценить, насколько сильно переоценена или недооценена компания по сравнению с собственными историческими оценками: P/E 2019 к fwdP/E2021"'},
            {name: 'Earnings surprise rate', nameRu: 'Доля Отчетов, превзошедших ожидания', param: '', paramColor: '', change: '', potential: '', tooltip: '"Показатель считается как доля результатов, превзошедших ожидания (и по прибыли, и по выручке) в последние 12 отчетов: Earnings surprise rate"'},
            {name: 'Гэпы вверх на отчетах', nameRu: 'Гэпы вверх на отчетах', param: '', paramColor: '', change: '', potential: '', tooltip: 'Показатель рассчитывается как доля случаев, когда после отчета акция открывается ростом более, чем на 1% на следующей основной сессии'},
            {name: 'Price to free Cash flow (P/FCF)', nameRu: 'Цена компании к денежному потоку', param: '', paramColor: '', change: '', potential: '', tooltip: '"Показатель рассчитывается путем деления капитализации компании на показатель свободного денежного потока - то есть денежных средств, добавленных на расчетные счета компании за год: Price to free Cash flow (P/FCF)"'},
            {name: 'Debt to Equity', nameRu: 'Долг к капиталу', param: '', paramColor: '', change: '', potential: '', tooltip: '"Показатель демонстрирует, насколько долг больше или меньше собственных средств компании: Debt to Equity"'},
            // {name: 'Темпы роста выручки 2019 к 2024', nameRu: 'Темпы роста выручки 2019 к 2024', param: '', paramColor: '', change: '', potential: '', tooltip: 'Показатель демонстрирует динамику прогнозной выручки 2024 года к 2019 году'},
            {name: 'Open Interest', nameRu: 'Цель по опционам', param: '', paramColor: '', change: '', potential: '', tooltip: '"Показатель акцентирует внимание на ключевой ожидаемой цене акции в январе 2022 года, в качестве ориентира берется наибольшее количество купленных контрактов call (рост акции) или put (падение акции) в январе 2022 года: Open Interest"'},
            {name: 'Tipranks', nameRu: 'Цель топ-аналитиков', param: '', paramColor: '', change: '', potential: '', tooltip: 'Отображение целевого значения от аналитиков с наибольшим процентом успеха по методологии Tipranks'},
        ],
        tech: [
            {name: 'Уровни', nameRu: 'Целевые уровни', param: '', paramColor: '', change: '', potential: '', tooltip: 'Исторические уровни, на которых цена находила поддержку/сопротивление'},
            {name: 'Fibo', nameRu: 'Уровни Фибоначчи', param: '', paramColor: '', change: '', potential: '', tooltip: 'Уровень, рассчитанный по ряду Фибоначчи, который выступает поддержкой или сопротивлением. Хорошо указывает глубину отката и динамику импульса продолжения роста'},
            {name: 'Stoch', nameRu: 'Перекупленность', param: '', paramColor: '', change: '', potential: '', tooltip: 'Показатели перекупленности/перепроданности по осциллятору Stochastic'},
            {name: 'Pattern', nameRu: 'Свечной паттерн', param: '', paramColor: '', change: '', potential: '', tooltip: ''},
            {name: 'Highs-lows', nameRu: 'Максимумы/минимумы ', param: '', paramColor: '', change: '', potential: '', tooltip: 'Более высокие максимумы и минимумы в диапазоне роста, более низкие - в диапазоне снижения'},
            {name: 'Sma-Ema', nameRu: 'Скользящие средние', param: '', paramColor: '', change: '', potential: '', tooltip: 'Положение относительно скользящих средних и их положение относительно друг друга. Цена выше 20й средней, а 20я выше 50й - признаки аптренда'},
            {name: 'Accum/Dist', nameRu: 'Накопление позиций', param: '', paramColor: '', change: '', potential: '', tooltip: 'Увеличение накопления позиций по индикатору Accumulation/Distribution, которые увеличивает объем накопленных позиций после зеленых свечей и уменьшает после красных'},
            {name: 'ADX', nameRu: 'Сила тренда', param: '', paramColor: '', change: '', potential: '', tooltip: 'Рассчитывается на основании последовательного направления, чем больше свечей в пользу конкретного направления, тем сильнее показатели тренда, используется индикатор ADX'},
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

    // const getSectors = () => {
    //     db.collection("sectors").orderBy("createdAt", "desc").get().then(item => {
    //         sectors.value = item.docs.map(doc => {
    //             return { ...doc.data(), id: doc.id }
    //         })
    //     })
    // }

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