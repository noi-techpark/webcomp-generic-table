export function arrayPush(arr, data) {
	if (!arr || !Array.isArray(arr)) {
		arr = [];
	}
	console.log("arr" + arr);
	console.log("data" + data);
	console.log(data);
	arr.push(data);
	// console.log(arr);
	return arr;
}

export function arrayFromObjects(objects) {
	return Object.keys(objects).reduce((arr, key) => {
		arrayPush(arr, objects[key]);
		return arr;
	});
}
