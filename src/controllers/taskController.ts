import { Request, Response } from "express";
import Task from "../models/task";

export const getTasks = async (req: any, res: Response) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const addTask = async (req: any, res: Response) => {
    try {
        const { title } = req.body;
        const task = new Task({ user: req.user.id, title });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const updateTask = async (req: any, res: Response) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.user.toString() !== req.user.id) {
            res.status(404).json({ message: "Task not found" });
            return
        }
        task.title = req.body.title;
        task.completed = req.body.completed;
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteTask = async (req: any, res: Response) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.user.toString() !== req.user.id) {
            res.status(404).json({ message: "Task not found" });
            return
        }
        await task.deleteOne();
        res.json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
