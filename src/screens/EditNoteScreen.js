import React from "react"
import { View, Text, StyleSheet } from "react-native"
import CreateEdit from "../components/CreateEdit";
const EditNoteScreen = ({ navigation, addNote }) => {
    return (
        <CreateEdit
            navigation={navigation}
            id="2"
            addNote={addNote}
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
                labelIdList: navigation.state.params.notes.labelIdList
            }}
        />
    )
}
const styles = StyleSheet.create({})
export default EditNoteScreen;