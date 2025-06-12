import React from "react";
import { BookFormData } from "../validation/schema";

interface SubmitFormProps {
    onSubmit: (data: BookFormData) => void;
}

const BookEditForm: React.FC<SubmitFormProps> = ({ onSubmit }) => {
const [book, setBook] = useState<Book>();
    
}