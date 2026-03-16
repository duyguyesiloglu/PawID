import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export function usePetDashboard() {
  const navigate = useNavigate();
  const [pet, setPet] = useState({ name: "", breed: "", age: "", photo: "", isLost: false });
  const [petId, setPetId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) { navigate("/login"); return; }
      
      const q = query(collection(db, "pets"), where("ownerId", "==", user.uid));
      const snap = await getDocs(q);
      
      if (!snap.empty) {
        setPetId(snap.docs[0].id);
        setPet(prev => ({ ...prev, ...snap.docs[0].data() }));
      } else {
        setPetId(user.uid);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSave = async () => {
    setSaving(true);
    await setDoc(doc(db, "pets", petId), { ...pet, ownerId: auth.currentUser.uid });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setSaving(false);
  };

  const handlePhoto = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    
    const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, { method: "POST", body: formData });
    const data = await res.json();
    setPet(prev => ({ ...prev, photo: data.secure_url }));
    setUploading(false);
  };

  return { pet, setPet, loading, saving, saved, uploading, handleSave, handlePhoto, petId };
}