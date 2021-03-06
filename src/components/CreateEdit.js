import React, { useState, useEffect, useContext } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native"
import { Overlay, Input, Button } from 'react-native-elements'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Context as RootContext } from '../contexts/RootContext'
const CreateEdit = ({ navigation, noteData, addNote, id }) => {
    console.disableYellowBox = true;
    const { archiveNote, colorNote, pinNote, updateReminder, removeReminder, trashNote } = useContext(RootContext)
    const colors = [
        { id: "1", color: "#fff" },
        { id: "2", color: '#f28b82' },
        { id: "3", color: '#fbbc04' },
        { id: "4", color: '#fff475' },
        { id: "5", color: '#ccff90' },
        { id: "6", color: '#a7ffeb' },
        { id: "7", color: '#cbf0f8' },
        { id: "8", color: '#aecbfa' },
        { id: "9", color: '#d7aefb' },
        { id: "10", color: '#fdcfe8' },
        { id: "11", color: '#e6c9a8' },
        { id: "12", color: '#e8eaed' },
    ];
    const [remmenu, setRemMenu] = useState(false)
    const [moremenu, setMoreMenu] = useState(false)
    const [title, setTitle] = useState(noteData.title);
    const [description, setDescription] = useState(noteData.description);
    const [isPined, setPin] = useState(noteData.isPined)
    const [isDeleted, setDelete] = useState(noteData.isDeleted)
    const [isArchived, setArchive] = useState(noteData.isArchived)
    const [reminder, setRemain] = useState(noteData.reminder)
    const [color, setColor] = useState(noteData.color)
    const [collaborators, setCollab] = useState(noteData.collaborators)
    const [noteLabels, setLabel] = useState(noteData.noteLabels);
    const [labelIdList, setLabelId] = useState(noteData.labelIdList)
    const [day, setDay] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [datePicker, setDatePicker] = useState(false);
    const [timePicker, setTimePicker] = useState(false);
    const [refId, setId] = useState(id)
    let dateone = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 10, 0, 0, 0)
    let datetwo = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 10, 0, 0, 0)
    let datethree = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 18, 0, 0, 0)
    console.log(noteData, "hell");

    useEffect(() => {
        if (navigation.state.params !== undefined) {
            if (navigation.state.params.label !== undefined) {
                const labelArray = navigation.state.params.label;
                let array = [];
                let idArray = [];
                labelArray.forEach(element => {
                    if (element.check) {
                        array.push(element.label)
                        idArray.push(element.label.id);
                    }
                });
                console.log(array);

                setLabel(array)
                setLabelId(JSON.stringify(idArray))
            }
            if (navigation.state.params.collaborator !== undefined) {
                setCollab(navigation.state.params.collaborator)
            }
        }
    }, [navigation])
    let colabObj = collaborators.map((el, index) => {
        return (
            <TouchableOpacity key={index}>
                <View style={{
                    height: 50,
                    width: 50,
                    backgroundColor: "coral",
                    borderWidth: 1,
                    borderColor: "lightgray",
                    borderRadius: 25,
                    marginRight: 5,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Text style={{ color: color }}>{el.firstName[0]}</Text>
                </View>
            </TouchableOpacity>
        )
    })
    let labelObj = noteLabels.map((el, index) => {
        return (
            <TouchableOpacity key={index}>
                <View style={{
                    padding: 5,
                    backgroundColor: color,
                    borderWidth: 1,
                    borderColor: "lightgray",
                    borderRadius: 20,
                    flexDirection: "row",
                    alignItems: "flex-start",
                    marginRight: 5
                }}>
                    <Text>{el.label}</Text>
                </View>
            </TouchableOpacity>
        )
    })
    return (
        <View style={{
            width: "100%",
            height: "100%",
            flex: 1,
            backgroundColor: color
        }}>
            <View style={{
                height: 60,
                width: "100%",
                position: "absolute",
                top: 0,
                borderBottomWidth: 1,
                borderBottomColor: "lightgray",
                backgroundColor: color,
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row"
            }}>
                <TouchableOpacity onPress={() => {
                    let formData = new FormData();
                    if (id == 2) {
                        formData.append("title", title)
                        formData.append("description", description)
                        formData.append("noteId", noteData.id)
                    } else {
                        formData.append("title", title)
                        formData.append("description", description)
                        formData.append("color", color)
                        formData.append("isPined", isPined)
                        if (reminder.toString().length !== 0) {
                            formData.append("reminder", reminder.toString())
                        }
                        if (labelIdList.length !== 0) {
                            formData.append("labelIdList", labelIdList)
                        }
                        if (collaborators.length !== 0) {
                            let collaberators = []
                            collaborators.forEach(element => {
                                collaberators.push({
                                    firstName: element.firstName, lastName: element.lastName,
                                    email: element.email, userId: element.userId
                                })
                            });
                            formData.append("collaberators", collaberators)
                        }
                        formData.append("isArchived", isArchived)
                        formData.append("isDeleted", isDeleted)
                    }
                    addNote(formData)
                }}>
                    <Feather style={{
                        marginLeft: 15
                    }} name="arrow-left" size={25} />
                </TouchableOpacity>
                <View style={styles.headerIcons}>
                    <TouchableOpacity>
                        {isPined ?
                            <TouchableOpacity onPress={() => {
                                if (id == 2) {
                                    let formData = {
                                        isPined: !isPined,
                                        noteIdList: [noteData.id]
                                    }
                                    pinNote(formData)
                                }
                                setPin(!isPined)
                            }}>
                                <MaterialCommunityIcons name="pin" size={25} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={() => {
                                    if (id == 2) {
                                        let formData = {
                                            isPined: !isPined,
                                            noteIdList: [noteData.id]
                                        }
                                        pinNote(formData)
                                    }
                                    setPin(!isPined)
                                }}>
                                <MaterialCommunityIcons name="pin-outline" size={25} />
                            </TouchableOpacity>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setRemMenu(!remmenu)
                    }}>
                        <MaterialCommunityIcons style={{
                            marginHorizontal: 30
                        }} name="bell-plus-outline" size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        if (id == 2) {
                            let formData = {
                                isArchived: !isArchived,
                                noteIdList: [noteData.id]
                            }
                            archiveNote(formData)
                        } else {
                            let formData = new FormData();
                            formData.append("title", title)
                            formData.append("description", description)
                            formData.append("color", color)
                            formData.append("isPined", isPined)
                            formData.append("reminder", reminder.toString())
                            formData.append("labelIdList", labelIdList)
                            if (collaborators.length !== 0) {
                                formData.append("collaberators", JSON.stringify(collaborators))
                            }
                            formData.append("isArchived", !isArchived)
                            formData.append("isDeleted", isDeleted)
                            addNote(formData)
                        }
                    }}>
                        <MaterialIcons style={{
                            marginRight: 15
                        }} name="archive" size={25} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.textContainer}>
                <TextInput style={{
                    fontSize: 20
                }}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Title" />
                <TextInput style={{
                    fontSize: 18,
                    marginVertical: 10
                }}
                    multiline
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Note" />
                {reminder === undefined ? null : reminder.toString().length !== 0 ? <TouchableOpacity onPress={() => {
                    setRemMenu(true)
                }}>
                    <View style={{
                        padding: 5,
                        borderWidth: 1,
                        borderColor: "lightgray",
                        borderRadius: 30,
                        backgroundColor: color,
                        width: reminder.toString().length + 92
                    }}>
                        {refId == 1 ? <Text>{reminder.toLocaleDateString()} {reminder.toLocaleTimeString()}</Text> :
                            <Text>{reminder.split('').filter((el, index) => {
                                return index < 21 && index > 3
                            })}</Text>
                        }
                    </View>
                </TouchableOpacity> : null}
                <View style={styles.label}>
                    {labelObj}
                </View>
                <View style={styles.label}>
                    {colabObj}
                </View>
            </View>
            <View style={{
                height: 50,
                width: "100%",
                position: "absolute",
                bottom: 0,
                borderTopWidth: 1,
                borderTopColor: "lightgray",
                backgroundColor: color,
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row"
            }}>
                <TouchableOpacity>
                    <AntDesign style={{
                        marginLeft: 15
                    }} name="plussquareo" size={25} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setMoreMenu(!moremenu)}>
                    <MaterialCommunityIcons style={{
                        marginRight: 15
                    }} name="dots-vertical" size={25} />
                </TouchableOpacity>
            </View>
            <Overlay
                isVisible={moremenu}
                containerStyle={{
                    backgroundColor: "#fff",
                    opacity: .1
                }}
                overlayStyle={{
                    width: "100%",
                    height: 320,
                    position: "absolute",
                    bottom: 51,
                    backgroundColor: color,
                    borderTopWidth: 1,
                    borderTopColor: "lightgray"
                }}
                onBackdropPress={() => {
                    setMoreMenu(!moremenu)
                }}
            >
                <View style={styles.View}>
                    <AntDesign style={styles.moreIcon} name="delete" size={25} />
                    <Text>Delete</Text>
                </View>
                <View style={styles.View}>
                    <MaterialCommunityIcons style={styles.moreIcon} name="content-copy" size={25} />
                    <Text>Make a copy</Text>
                </View>
                {id == 2 ?
                    <TouchableOpacity onPress={() => {
                        const field = {
                            isDeleted: !isDeleted,
                            noteIdList: [noteData.id]
                        }
                        trashNote(field);
                        setDelete(!isDeleted)
                    }}>
                        <View style={styles.View}>
                            <EvilIcons style={styles.moreIcon} name="trash" size={25} />
                            <Text>
                                Trash
                    </Text>
                        </View>
                    </TouchableOpacity>
                    : <View style={styles.View}>
                        <EvilIcons style={styles.moreIcon} name="share-google" size={25} />
                        <Text>
                            Send
                    </Text>
                    </View>}
                <TouchableOpacity onPress={() => {
                    id == 2 ? navigation.navigate('Collaborator', { id: id }) : navigation.navigate('Collaborator', { id: id })
                }}>
                    <View style={styles.View}>
                        <MaterialIcons style={styles.moreIcon} name="person-add" size={25} />
                        <Text>Collaborator</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setMoreMenu(!moremenu)
                    navigation.navigate('LabelNote', { noteLabels: noteLabels, id: id, noteId: noteData.id })
                }}>
                    <View style={styles.View}>
                        <MaterialIcons style={styles.moreIcon} name="label-outline" size={25} />
                        <Text>Labels</Text>
                    </View>
                </TouchableOpacity>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={colors}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return <TouchableOpacity onPress={() => {
                            if (id == 2) {
                                let formData = {
                                    color: item.color,
                                    noteIdList: [noteData.id]
                                }
                                colorNote(formData)
                            }
                            setColor(item.color)
                        }}>
                            <View
                                style={{
                                    height: 35,
                                    width: 35,
                                    borderRadius: 35 / 2,
                                    backgroundColor: item.color,
                                    margin: 5,
                                    borderWidth: 1,
                                    borderColor: "lightgray"
                                }} />
                        </TouchableOpacity>
                    }}
                />
            </Overlay>
            <Overlay
                overlayStyle={{
                    width: 300,
                    height: 300,
                    zIndex: 0
                }}
                isVisible={remmenu}
                onBackdropPress={() => {
                    setRemMenu(!remmenu)
                }}
            >
                <Text>Add reminder</Text>
                <TouchableOpacity onPress={() => {
                    setDatePicker(true)

                }}>
                    <Input
                        disabled
                        value={day.toLocaleDateString()}
                        rightIcon={
                            <AntDesign name="calendar" size={20} />
                        }
                        placeholder="pick a day" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setTimePicker(true)
                }}>
                    <Input
                        disabled
                        value={time.toLocaleTimeString()}
                        rightIcon={
                            <MaterialIcons name="access-time" size={20} />
                        }
                        placeholder="pick time" />
                    <TouchableOpacity onPress={() => {
                        setDay(dateone);
                        setTime(dateone);
                    }}>
                        <View style={styles.dateView}>
                            <Text>Today Morning</Text>
                            <Text>{dateone.toLocaleTimeString()} AM</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setDay(datetwo);
                        setTime(datetwo);
                    }}>
                        <View style={styles.dateView}>
                            <Text>tomorrow Morning</Text>
                            <Text>{datetwo.toLocaleTimeString()} AM</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setDay(datethree);
                        setTime(datethree);
                    }}>
                        <View style={styles.dateView}>
                            <Text>Today evening</Text>
                            <Text>{datethree.toLocaleTimeString()} PM</Text>
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
                <View style={styles.buttonView}>
                    <Button type="clear" title="Cancel" onPress={() => {
                        if (id == 2) {
                            let formData = {
                                noteIdList: [noteData.id]
                            }
                            removeReminder(formData)
                        }
                        setRemain(undefined)
                        setRemMenu(false)
                    }} />
                    <Button
                        onPress={() => {
                            if (id == 2) {
                                let formData = {
                                    noteIdList: [noteData.id],
                                    reminder: day
                                }
                                updateReminder(formData)
                            }
                            setId("1")
                            setRemain(day)
                            setRemMenu(false)
                        }}
                        containerStyle={styles.saveButton} title="Save" buttonStyle={{
                            backgroundColor: "dodgerblue"
                        }} />
                </View>
            </Overlay>
            <DateTimePickerModal
                minimumDate={new Date()}
                isVisible={datePicker}
                mode="datetime"
                onConfirm={(date) => {
                    setDay(date);
                    setTime(date)
                    setDatePicker(false)
                }}
                onCancel={() => setDatePicker(false)}
            />
            <DateTimePickerModal
                minimumDate={new Date().getTime()}
                timeZoneOffsetInMinutes
                isVisible={timePicker}
                mode="datetime"
                onConfirm={(time) => {
                    setTime(time);
                    setDay(time);
                    console.log(day);

                    setTimePicker(false)
                }}
                onCancel={() => setTimePicker(false)}
            />

        </View>
    )
};
const styles = StyleSheet.create({
    headerIcons: {
        flexDirection: "row",
        alignItems: "center",
    },
    textContainer: {
        top: 90,
        padding: 10
    },
    View: {
        flexDirection: "row",
        width: "100%",
        height: 50,
        alignItems: "center"
    },
    moreIcon: {
        marginLeft: 15,
        marginRight: 30
    },
    dateView: {
        height: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10
    },
    buttonView: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    saveButton: {
        width: 80,
        marginHorizontal: 10
    },
    label: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10
    }
});
export default CreateEdit