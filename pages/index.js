// import { useEffect, useState } from "react";
// import styles from '../styles/Home.module.css';
// import {ethers} from 'ethers';
// import * as Constants from "../Utils/config"


// function App() {

//   const [task, setTask] = useState('');
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const connectToMetamask = async () => {
//       try {
//         if (window.ethereum) {
//           const provider = new ethers.providers.Web3Provider(window.ethereum);
//           const signer = provider.getSigner();
//           console.log(await signer.getAddress());
//           const contractInstance = new ethers.Contract(Constants.contractAddress, Constants.contractAbi, signer);
//           var tasks = await contractInstance.getAllTasks();
//           setTasks(tasks);
//           console.log(tasks);
//         }
//         else {
//           console.log("Metamask not found");
//         }

//       }
//       catch (err) {
//         console.error(err)
//       }
//     };

//     connectToMetamask();
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const response = await fetch('/api/addTask', {
//       method: 'POST',
//       headers: {
//         'Content-Type' : 'application/json'
//       },
//       body: JSON.stringify(task)
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       console.log(error);
//     }

//     const resp = await response.json();
//     const status = resp.message;
//     console.log(status);

//   }

//   const handleChange = async (event) => {
//     setTask(event.target.value);

//   }

//   const changeTaskStatus = async (taskId) => {
//     const response = await fetch ('/api/changeStatus', {
//       method: 'POST',
//       headers: {
//         'Content-Type' : 'application/json'
//       },
//       body: JSON.stringify(taskId)
//     });
//     if (!response.ok) {
//       const error = await response.json();
//       console.log(error);
//     }

//     const resp = await response.json();
//     const status = resp.message;
//     console.log(status);
    
//   }

//   return (
//     <div>
//       <div className={styles.container}>Welcome to the Decentralized To Do Application</div>
//       <div className={styles.container}>
//         <form className={styles.form} onSubmit={handleSubmit}>
//           <input type="text" name="task" placeholder="Add task here ..." onChange={handleChange} value={task} />
//           <input type="submit" value="Add Task" />
//         </form>
//       </div>
//       <div className={styles.container}>
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Task ID</th>
//               <th>Task Description</th>
//               <th>Task Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.map((task, index) => (
//               <tr key={index}>
//                 <td>{index}</td>
//                 <td>{task.desc}</td>
//                 <td>{task.status === 0 ? 'Pending' : 'Finished'}</td>
//                 <td >
//                 {task.status === 0 ? <button className={styles.button} onClick={() => changeTaskStatus(index)}>Click me</button> : null}
                
//                 </td>

                
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


// export default App;




import { useEffect, useState } from "react";
import styles from '../styles/Home.module.css';
import { ethers } from 'ethers';
import * as Constants from "../Utils/config";

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // Function to request account access from MetaMask
  const requestAccount = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      console.log("Metamask not found");
    }
  };

  // Function to fetch tasks from the contract
  const fetchTasks = async () => {
    try {
      if (window.ethereum) {
        await requestAccount(); // Request account access if not already granted
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(Constants.contractAddress, Constants.contractAbi, signer);
        const tasks = await contractInstance.getAllTasks();
        setTasks(tasks);
        console.log("Fetched tasks:", tasks);
      } else {
        console.log("Metamask not found");
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    // Fetch tasks when the component mounts
    fetchTasks();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/addTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ task })
    });

    if (!response.ok) {
      const error = await response.json();
      console.log(error);
    } else {
      const resp = await response.json();
      console.log("Task added:", resp.message);

      // Directly update the tasks state with the new task
      setTasks((prevTasks) => [
        ...prevTasks,
        { desc: task, status: 0 } // Assuming new tasks start as "Pending"
      ]);
      setTask(''); // Clear input field
    }
  };

  const handleChange = (event) => {
    setTask(event.target.value);
  };

  const changeTaskStatus = async (taskId) => {
    const response = await fetch('/api/changeStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ taskId })
    });

    if (!response.ok) {
      const error = await response.json();
      console.log(error);
    } else {
      const resp = await response.json();
      console.log("Task status changed:", resp.message);

      // Update the tasks state to reflect the status change
      setTasks((prevTasks) =>
        prevTasks.map((task, index) =>
          index === taskId ? { ...task, status: 1 } : task
        )
      );
    }
  };

  return (
    <div>
      <div className={styles.container}>Welcome to the Decentralized To-Do Application</div>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="task"
            placeholder="Add task here ..."
            onChange={handleChange}
            value={task}
          />
          <input type="submit" value="Add Task" />
        </form>
      </div>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Task Description</th>
              <th>Task Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{task.desc}</td>
                <td>{task.status === 0 ? 'Pending' : 'Finished'}</td>
                <td>
                  {task.status === 0 ? (
                    <button
                      className={styles.button}
                      onClick={() => changeTaskStatus(index)}
                    >
                      Mark as Done
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
