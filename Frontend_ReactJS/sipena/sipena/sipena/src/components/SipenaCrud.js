import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SipenaCrud() {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({ judul: '', lokasi: '', thn_akademik: '', tanggal: '', status: '' });
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);

    const fetchData = async () => {
        try {
            // Menggunakan URL lengkap dengan /api
            const response = await axios.get('http://localhost:3010/api/penelitian');
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await axios.put(`http://localhost:3010/api/penelitian/${editId}`, form);
            } else {
                await axios.post('http://localhost:3010/api/penelitian', form);
            }
            fetchData();
            setForm({ judul: '', lokasi: '', thn_akademik: '', tanggal: '', status: '' });
            setIsEdit(false);
        } catch (error) {
            console.error("Error submitting data", error);
        }
    };

    const handleEdit = (item) => {
        setForm(item);
        setIsEdit(true);
        setEditId(item.kd_penelitian);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3010/api/penelitian/${id}`);
            fetchData();
        } catch (error) {
            console.error("Error deleting data", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h3 className="text-1xl font-bold mb-4">Tambahkan Penelitian Baru</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="border rounded p-2 w-full"
                    placeholder="Judul"
                    value={form.judul}
                    onChange={(e) => setForm({ ...form, judul: e.target.value })}
                    required
                />
                <input
                    type="text"
                    className="border rounded p-2 w-full"
                    placeholder="Lokasi"
                    value={form.lokasi}
                    onChange={(e) => setForm({ ...form, lokasi: e.target.value })}
                    required
                />
                <input
                    type="text"
                    className="border rounded p-2 w-full"
                    placeholder="Tahun Akademik"
                    value={form.thn_akademik}
                    onChange={(e) => setForm({ ...form, thn_akademik: e.target.value })}
                    required
                />
                <input
                    type="date"
                    className="border rounded p-2 w-full"
                    value={form.tanggal}
                    onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
                    required
                />
                <input
                    type="number"
                    className="border rounded p-2 w-full"
                    placeholder="Status"
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    required
                />
                <button className="bg-blue-500 text-white p-2 rounded" type="submit">
                    {isEdit ? 'Update' : 'Upload'}
                </button>
            </form>
            <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Judul</th>
                        <th className="border border-gray-300 px-4 py-2">Lokasi</th>
                        <th className="border border-gray-300 px-4 py-2">Tahun Akademik</th>
                        <th className="border border-gray-300 px-4 py-2">Tanggal</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.kd_penelitian}>
                            <td className="border border-gray-300 px-4 py-2">{item.judul}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.lokasi}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.thn_akademik}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.tanggal}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.status}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleEdit(item)}>
                                    Edit
                                </button>
                                <button className="bg-red-500 text-white px-2 py-1 rounded ml-2" onClick={() => handleDelete(item.kd_penelitian)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SipenaCrud;
