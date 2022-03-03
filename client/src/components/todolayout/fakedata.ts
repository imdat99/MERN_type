const mockData = [
    {
        id: 'READY',
        title: ' 📃 To do',
        tasks: [
            {
                id: '111',
                title: 'Learn JavaScript'
            },
            {
                id: '112',
                title: 'Learn Git'
            },
            {
                id: '113',
                title: 'Learn Python'
            },
        ]
    },
    {
        id: 'PROCESSING',
        title: ' ✏️ In progress',
        tasks: [
            {
                id: '121',
                title: 'Learn CSS'
            },
            {
                id: '122',
                title: 'Learn Golang'
            }
        ]
    },
    {
        id: 'COMPLETED',
        title: ' ✔️ Completed',
        tasks: [
            {
                id: '131',
                title: 'Learn HTML'
            }
        ]
    }
    ,
    {
        id: 'SUSPEND',
        title: ' 🛑 suspend',
        tasks: [
            {
                id: '141',
                title: 'Learn BKHN'
            }
        ]
    }
]

export default mockData