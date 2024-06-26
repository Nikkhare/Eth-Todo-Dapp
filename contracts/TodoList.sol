// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TodoList {
    uint256 public taskCount = 0;

    struct Task {
        uint256 id;
        string content;
        bool completed;
    }

    mapping(uint256 => Task) public tasks;

    event TaskCreated(uint256 id, string content, bool completed);

    event TaskCompleted(uint256 id, bool completed);

    // event TaskUpdated(uint256 id, string newContent, bool completed);

    function createTask(string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false);
        emit TaskCreated(taskCount, _content, false);
    }

    function toggleCompleted(uint256 _id) public {
        tasks[_id].completed = !tasks[_id].completed;
        emit TaskCompleted(_id, tasks[_id].completed);
    }

    function clearCompletedTasks() public {
        for (uint256 i = 1; i <= taskCount; i++) {
            if (tasks[i].completed) {
                // tasks[i] = Task(tasks[i].id, "", false);
                delete tasks[i];
                taskCount--;
            }
        }
    }

    // function updateTask(uint256 _id, string memory _newContent) public {
    //     require(_id <= taskCount, "Invalid task ID");
    //     require(tasks[_id].id != 0, "Task does not exist");

    //     tasks[_id].content = _newContent;
    //     emit TaskUpdated(_id, _newContent, false);
    // }
}
