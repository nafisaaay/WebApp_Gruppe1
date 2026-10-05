//skal inneholde en form hvor brukere kan legge inn en tekst, en knapp for å sende og en toggle for event 
import {useState} from "react";
import { createPost } from "./CreatePost";


export function PostForm() {

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      await createPost(formData);
      alert("Post created successfully!");
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error creating post: ${error.message}`);
      } else {
        alert("An unknown error occurred while creating the post.");
      }
    }

 const [text, setText] = useState("");
  return (
    <form>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Write your post here..." />
      <label>
        <input type="checkbox" />
        Event
      </label>
      <button  type="submit">Submit</button>
    </form>
  );
}}
