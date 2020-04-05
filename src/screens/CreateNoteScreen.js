import React, { useState, useContext } from "react"
import { Context as NoteContext } from '../contexts/RootContext'
import CreateEdit from "../components/CreateEdit"
const CreateNoteScreen = ({ navigation }) => {
    const { state, addNote } = useContext(NoteContext)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isPinned, setPin] = useState(false)
    const [isDeleted, setDelete] = useState(false)
    const [isArchived, setArchive] = useState(false)
    const [reminder, setRemain] = useState([])
    const [color, setColor] = useState("#fff")
    const [collaborators, setCollab] = useState([])
    const [noteLabels, setLabel] = useState([])
    return (
        <CreateEdit
            navigation={navigation}
            addNote={addNote}
            noteData={{ title, description, isPinned, isDeleted, isArchived, reminder, color, collaborators, noteLabels }}
        />
    )
}
CreateNoteScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}
export default CreateNoteScreen;