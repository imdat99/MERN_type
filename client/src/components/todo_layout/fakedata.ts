const mockData = [
    {
        _id: 'READY',
        title: ' 📃 To do',
        tasks: [
            {
                _id: '111',
                title: 'Learn JavaScript',
                desc: '123',
                status: 'READY',
            },
            {
                _id: '112',
                title: 'Learn Git',
                desc: '234',
                status: 'READY',
            },
            {
                _id: '113',
                title: 'Learn Python',
                desc: '234',
                status: 'READY',
            },
        ]
    },
    {
        _id: 'PROCESSING',
        title: ' ✏️ In progress',
        tasks: [
            {
                _id: '121',
                title: 'Learn CSS',
                desc: '234',
                status: 'PROCESSING',
            },
            {
                _id: '122',
                title: 'Learn Golang',
                desc: '234',
                status: 'PROCESSING',
            }
        ]
    },
    {
        _id: 'COMPLETED',
        title: ' ✔️ Completed',
        tasks: [
            {
                _id: '131',
                title: 'Learn HTML',
                desc: '234',
                status: 'COMPLETED',
            }
        ]
    }
    ,
    {
        _id: 'SUSPEND',
        title: ' 🛑 suspend',
        tasks: [
            {
                _id: '141',
                title: 'Learn BKHN',
                desc: '234',
                status: 'SUSPEND',
            }
        ]
    }
]

export default mockData