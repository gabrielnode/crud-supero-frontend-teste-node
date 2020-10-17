import React, { useEffect, useState } from 'react';
import { Container, TextWarning } from './styles'
import MaterialTable from "material-table";
import { api } from '../../services/api'
import { ModalEdit } from '../../components/Modal'
const Home = () => {

    const [books, setBooks] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function getBook() {
            const response = await api.get('/books');
            console.log(response.data)
            setBooks(response.data.items)
        }
        getBook()
    }, [])
    const handleClose = () => {
        setOpen(false);
    };
    const handleUpdatedBook = (newData, oldData) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const dataUpdate = [...books];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = { ...newData };
                    delete newData.id
                    await api.put(`/books/${dataUpdate[index].id}`, newData)
                    setBooks([...dataUpdate]);
                    resolve();

                } catch (error) {
                    reject(error)
                }
            }, 1000)
        })

    }
    const handleDeleteBook = (oldData) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const dataDelete = [...books];
                    const index = oldData.tableData.id;
                    const res = await api.delete(`/books/${dataDelete[index].id}`)

                    dataDelete.splice(index, 1);
                    setBooks([...dataDelete]);
                    resolve();

                } catch (error) {
                    reject(error)
                }
            }, 1000)
        })

    }
    const handleAddBook = (newData) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const data = {
                    id: '3fa21f45-5717-4562-b3fc-2c963f66afa6',
                    ...newData
                }
                console.log([...books, data])
                setBooks([...books, newData]);

                resolve();
            }, 1000);
        })
    }
    return (
        <>
            <Container>
                <div style={{ maxWidth: "100%" }}>
                    {books[0] ? (
                        <MaterialTable
                            columns={[
                                { title: "titulo", field: "titulo" },
                                { title: "autor", field: "autor" },
                                { title: "editora", field: "editora" },
                                { title: "ano", field: "ano", type: "numeric" },
                            ]}
                            data={books}
                            editable={{
                                onRowAdd: newData => handleAddBook(newData),
                                onRowUpdate: (newData, oldData) => handleUpdatedBook(newData, oldData),
                                onRowDelete: (oldData) => handleDeleteBook(oldData)
                            }}
                            title="Demo Title"
                        />
                    ) :
                        <TextWarning>Estamos sem livros! :(</TextWarning>
                    }
                </div>
                <ModalEdit open={open} handleClose={() => handleClose()} />
            </Container>
        </>
    )
}

export { Home }