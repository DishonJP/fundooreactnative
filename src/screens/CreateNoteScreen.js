import React, { useState, useContext } from "react"
import { Context as NoteContext } from '../contexts/RootContext'
import CreateEdit from "../components/CreateEdit"
const CreateNoteScreen = ({ navigation }) => {
    console.disableYellowBox = true;
    const { addNote } = useContext(NoteContext)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isPined, setPin] = useState(false)
    const [isDeleted, setDelete] = useState(false)
    const [isArchived, setArchive] = useState(false)
    const [reminder, setRemain] = useState([])
    const [color, setColor] = useState("#fff")
    const [collaborators, setCollab] = useState([])
    const [noteLabels, setLabel] = useState([])
    const [labelIdList, setId] = useState([])

    return (
        <CreateEdit
            navigation={navigation}
            id="1"
            addNote={addNote}
            noteData={{ title, description, isPined, isDeleted, isArchived, reminder, color, collaborators, noteLabels, labelIdList }}
        />
    )
}
CreateNoteScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}
export default CreateNoteScreen;