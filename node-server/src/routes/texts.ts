import { Router, Request, Response } from 'express';

const router = Router();

// In-memory array to store text data
const texts: string[] = [];

// Route to save new text data
router.post('/', (req: Request, res: Response) => {
    const { text } = req.body;
    if (typeof text === 'string' && text.trim()) {
        texts.push(text);
        res.status(201).json({ message: 'Text saved successfully' });
    } else {
        res.status(400).json({ error: 'Invalid text data' });
    }
});

// Route to save new text data
router.delete('/:index', (req: Request, res: Response) => {
    const index = parseInt(req.params.index, 10);
    if (index >= 0 && index < texts.length) {
        texts.splice(index, 1); // Remove the item at the specified index
        res.status(200).json({ message: 'Text deleted successfully' });
    } else {
        res.status(404).json({ message: 'Text not found' });
    }
});

// Route to retrieve all saved text data
router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ texts });
});

export default router;
