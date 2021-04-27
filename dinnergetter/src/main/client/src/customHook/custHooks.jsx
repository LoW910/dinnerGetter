import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";


export default function useCustomHook(url) {
	const [list, setList] = useState([]);
	const [backLog, setBacklog] = useState()
	const [single, setSingle] = useState({
		name: "",
		dueDate: "",
	});
	const [errors, setErrors] = useState({
		name: "",
		dueDate: "",
	});

	let loaded = true;
	const getAll = async () => {
		try {
			return axios.get(url).then((res) => {
				if (loaded) setList(res.data);
			});
		} catch (err) {
			return err;
		}
	};

	const getOne = async (id) => {
		try {
			let results = await axios.get(`${url}/${id}`);
			return results;
		} catch (err) {
			return err;
		}
	};

	const updateOne = async (id, data) => {
		try {
			return axios
				.put(`${url}/${id}`, data)
				.then((res) => res.data)
				.then((res) => {
					setErrors({
						name: "",
						type: "",
						description: "",
					});
					getAll();
					navigate("/");
				})
				.catch((err) => {
					setErrors(err.response.data.error.errors);
				});
		} catch (err) {
			return err;
		}
	};

	const addOne = async (data) => {
		try {
			return axios
				.post(`${url}`, data)
				.then((res) => res.data)
				.then((res) => {
					setErrors({
						name: "",
						type: "",
						description: "",
					});
					getAll();
					navigate("/");
				})
				.catch((err) => {
					setErrors(err.response.data.error.errors);
				});
		} catch (err) {
			return err;
		}
	};

	const deleteOne = async (id) => {
		try {
			axios.delete(`${url}/${id}`).then((res) => {
				getAll();
			});
		} catch (err) {
			return err;
		}
	};

	useEffect(() => {
		getAll();
		return () => {
			loaded = false;
		};
	}, []);

	return [list,setList,getAll,getOne,updateOne,addOne,deleteOne,single,setSingle,errors,setErrors,backLog,setBacklog];
}
