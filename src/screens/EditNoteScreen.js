import React, { useContext } from "react"
import { View, Text, StyleSheet } from "react-native"
import CreateEdit from "../components/CreateEdit";
import { Context as RootContext } from '../contexts/RootContext'
const EditNoteScreen = ({ navigation, }) => {
    console.disableYellowBox = true;
    const { updateNote } = useContext(RootContext)
    return (
        <CreateEdit
            navigation={navigation}
            id="2"
            addNote={updateNote}
            noteData={{
                title: navigation.state.params.notes.title,
                description: navigation.state.params.notes.description,
                isPined: navigation.state.params.notes.isPined,
                isDeleted: navigation.state.params.notes.isDeleted,
                isArchived: navigation.state.params.notes.isArchived,
                reminder: navigation.state.params.notes.reminder[0],
                color: navigation.state.params.notes.color,
                collaborators: navigation.state.params.notes.collaborators,
                noteLabels: navigation.state.params.notes.noteLabels,
                labelIdList: navigation.state.params.notes.labelIdList,
                id: navigation.state.params.notes.id
            }}
        />
    )
}
EditNoteScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}
const styles = StyleSheet.create({})
export default EditNoteScreen;