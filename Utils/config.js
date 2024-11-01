export const API_URL = "https://volta-rpc.energyweb.org/";
export const PRIVATE_KEY = "1e7921b7c6ec5f08cd3001ed90cf62e7ab6105c4d85d07627c606bc57eb8d053";
export const contractAddress = "0xf8e81D47203A594245E36C48e151709F0C19fBe8";
export const contractAbi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_desc",
				"type": "string"
			}
		],
		"name": "addTask",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "markAsFinished",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getAllTasks",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "desc",
						"type": "string"
					},
					{
						"internalType": "enum TaskToDo.TaskStatus",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct TaskToDo.Task[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getTask",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "enum TaskToDo.TaskStatus",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tasks",
		"outputs": [
			{
				"internalType": "string",
				"name": "desc",
				"type": "string"
			},
			{
				"internalType": "enum TaskToDo.TaskStatus",
				"name": "status",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
