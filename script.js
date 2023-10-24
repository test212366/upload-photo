import firebase from 'firebase/app'
import 'firebase/storage'
import { upload } from './upload'

const firebaseConfig = {
	apiKey: "AIzaSyDX8BLYqp3ADYWXL4GFjPazu0Y_B-vMiO0",
	authDomain: "fe-uploas.firebaseapp.com",
	projectId: "fe-uploas",
	storageBucket: "fe-uploas.appspot.com",
	messagingSenderId: "243686752804",
	appId: "1:243686752804:web:a8a8052ad94c2b7e014eb1"
}
firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

upload('#file', {
	multi: true,
	accept: ['.png', '.jpg', '.jpeg', '.gif', '.svg'],
	onUpload(files, blocks) {
		files.forEach((file, index) => {
			const ref = storage.ref(`images/${file.name}`)
			const task = ref.put(file)
			task.on('state_changed', snapshot => {
				const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0)
				const block = blocks[index].querySelector('.preview-info-progress')
				block.textContent = percentage
				block.style.width = percentage + '%'
			}, error => {

			}, () => {
				console.log('complete');
			})
		})
	}
})