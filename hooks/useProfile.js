import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useProfile() {
	const { data: status } = useSession();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		axios.get("/api/profile").then((response) => {
			setUser(response.data);
			setLoading(false);
		});
	}, [status]);

	return { user, loading };
}
