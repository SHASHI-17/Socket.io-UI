

export const sampleChats = [
    {
        avatar: ['https://images.pexels.com/photos/20440051/pexels-photo-20440051/free-photo-of-a-woman-leaning-against-a-railing-with-her-hand-on-her-chin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
        name: 'John Doe',
        _id: "1",
        groupChat: false,
        members: ['1', '2']
    },
    {
        avatar: ['https://images.pexels.com/photos/20440051/pexels-photo-20440051/free-photo-of-a-woman-leaning-against-a-railing-with-her-hand-on-her-chin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',],
        name: 'John Bio',
        _id: "2",
        groupChat: false,
        members: ['1', '2']
    },
]

export const sampleUsers = [
    {
        avatar: ['https://images.pexels.com/photos/20440051/pexels-photo-20440051/free-photo-of-a-woman-leaning-against-a-railing-with-her-hand-on-her-chin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
        name: 'John Doe',
        _id: "1",
    },
    {
        avatar: ['https://images.pexels.com/photos/20440051/pexels-photo-20440051/free-photo-of-a-woman-leaning-against-a-railing-with-her-hand-on-her-chin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
        name: 'John boi',
        _id: "2",
    },
]
export const sampleNotifications = [
    {
        sender: {
            avatar: ['https://images.pexels.com/photos/20440051/pexels-photo-20440051/free-photo-of-a-woman-leaning-against-a-railing-with-her-hand-on-her-chin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
            name: 'John Doe',
        },
        _id: "1",
    },
    {
        sender: {
            avatar: ['https://images.pexels.com/photos/20440051/pexels-photo-20440051/free-photo-of-a-woman-leaning-against-a-railing-with-her-hand-on-her-chin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
            name: 'John Doe',
        },
        _id: "2",
    },
]

export const sampleMessage = [
    {
        attachments: [
            {
                public_id: 'asadad',
                url: 'https://images.pexels.com/photos/20440051/pexels-photo-20440051/free-photo-of-a-woman-leaning-against-a-railing-with-her-hand-on-her-chin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
        ],
        content: 'lauda ka sarkar hai',
        _id: 'dlnaslkfsafalsdsf',
        sender: {
            _id: 'user_id',
            name: "don"
        },
        chat: 'chatId',
        createdAt: '2024-02-12T10:41:30.630Z'
    },
    {
        attachments: [
            {
                public_id: 'asadad wqrqwr',
                url: 'https://images.pexels.com/photos/20309830/pexels-photo-20309830/free-photo-of-common-buckeye-junonia-coenia.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
            },
        ],
        content: 'lauda ka sarkar hai dasfa',
        _id: 'dlnaslkfsafalsdsf dasf',
        sender: {
            _id: 'slflsfasfa',
            name: "kiran"
        },
        chat: 'chatId',
        createdAt: '2024-02-12T10:41:30.630Z'
    }
]

export const dashboardData = {
    users: [
        {
            avatar: ['https://images.pexels.com/photos/20440051/pexels-photo-20440051/free-photo-of-a-woman-leaning-against-a-railing-with-her-hand-on-her-chin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
            name: 'John Doe',
            _id: "1",
            username: "john_doe",
            friends: 20,
            groups: 5
        },
        {
            avatar: ['https://images.pexels.com/photos/20440051/pexels-photo-20440051/free-photo-of-a-woman-leaning-against-a-railing-with-her-hand-on-her-chin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
            name: 'John Doe',
            _id: "2",
            username: "john_bio",
            friends: 10,
            groups: 3
        }
    ],


    chats: [
        {
            avatar: ['https://images.pexels.com/photos/20440051/pexels-photo-20440051/free-photo-of-a-woman-leaning-against-a-railing-with-her-hand-on-her-chin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
            name: 'John Doe',
            _id: "1",
            groupChat: false,
            members: [
                {
                    _id: '1',
                    avatar: 'https://images.pexels.com/photos/20440051/pexels-photo-20440051/free-photo-of-a-woman-leaning-against-a-railing-with-her-hand-on-her-chin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                },
                {
                    _id: '2',
                    avatar: 'https://images.pexels.com/photos/20440051/pexels-photo-20440051/free-photo-of-a-woman-leaning-against-a-railing-with-her-hand-on-her-chin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                },
            ],
            totalMembers: 2,
            totalMessages: 20,
            creator: {
                name: "John Doe",
                avatar: 'https://images.pexels.com/photos/20440051/pexels-photo-20440051/free-photo-of-a-woman-leaning-against-a-railing-with-her-hand-on-her-chin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            }
        },
        {
            avatar: ['https://images.pexels.com/photos/20440051/pexels-photo-20440051/free-photo-of-a-woman-leaning-against-a-railing-with-her-hand-on-her-chin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
            name: 'John boi',
            _id: "2",
            groupChat: true,
            members: [
                {
                    _id: '1',
                    avatar: 'https://images.pexels.com/photos/20440051/pexels-photo-20440051/free-photo-of-a-woman-leaning-against-a-railing-with-her-hand-on-her-chin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                },
                {
                    _id: '2',
                    avatar: 'https://images.pexels.com/photos/20440051/pexels-photo-20440051/free-photo-of-a-woman-leaning-against-a-railing-with-her-hand-on-her-chin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                },
            ],
            totalMembers: 2,
            totalMessages: 20,
            creator: {
                name: "John bbi",
                avatar: 'https://images.pexels.com/photos/20440051/pexels-photo-20440051/free-photo-of-a-woman-leaning-against-a-railing-with-her-hand-on-her-chin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            }
        }
    ],

    messages: [
        {
            attachments:[],
            content:"Lauda ka message hai",
            _id:"dasljsdla",
            sender:{
                avatar: 'https://images.pexels.com/photos/20440051/pexels-photo-20440051/free-photo-of-a-woman-leaning-against-a-railing-with-her-hand-on-her-chin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                name:"shashi"
            },
            chat:"chatID",
            groupChat:false,
            createdAt: '2024-02-12T10:41:30.630Z'
        },
        {
            attachments: [
                {
                    public_id: 'asadad',
                    url: 'https://images.pexels.com/photos/20440051/pexels-photo-20440051/free-photo-of-a-woman-leaning-against-a-railing-with-her-hand-on-her-chin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                },
            ],
            content:"Lauda ka message hai",
            _id:"daaaasljla",
            sender:{
                avatar: 'https://images.pexels.com/photos/20440051/pexels-photo-20440051/free-photo-of-a-woman-leaning-against-a-railing-with-her-hand-on-her-chin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                name:"shashi"
            },
            chat:"chatID",
            groupChat:true,

            createdAt: '2024-02-12T10:41:30.630Z'
        }
    ]
}


