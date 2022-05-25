'use strict';

let darkmodeState;

const Settings = {
	'MAIN_TABLE_WIDTH': 4,
	'COMBO_TABLE_WIDTH': 4,
	'DEFAULT_MAX_CAP': 15,
}

const Menu = {
	// Items:
	"Food:": {
		header: true,
	},
	"Fruit Cube": {
	   	price: 100,
	   	noDiscount: false,
	   	lastItem: false,
	  	items: ["Fruit Cube"],
	},
	"Cannoli": {
	   	price: 100,
	   	noDiscount: false,
	   	lastItem: false,
	  	items: ["Cannoli"],
	},
	"Pain au Chocolate": {
	   	price: 100,
	   	noDiscount: false,
	   	lastItem: false,
	  	items: ["Pain au Chocolate"],
	},
	"Meatball Sub": {
	   	price: 100,
	   	noDiscount: false,
	   	lastItem: false,
	  	items: ["Meatball Sub"],
	},
	"Char Board": {
	   	price: 100,
	   	noDiscount: false,
	   	lastItem: false,
	  	items: ["Char Board"],
	},
	"Drinks:": {
		header: true,
	},
	"Tropical Punch": {
	   	price: 100,
	   	noDiscount: false,
	   	lastItem: false,
	  	items: ["Tropical Punch"],
	},
	"Frappuccino": {
	   	price: 100,
	   	noDiscount: false,
	   	lastItem: false,
	  	items: ["Frappuccino"],
	},
	"Grape Juicebox": {
	   	price: 100,
	   	noDiscount: false,
	   	lastItem: false,
	  	items: ["Grape Juicebox"],
	},
	"Hot Chocolate": {
	   	price: 100,
	   	noDiscount: false,
	   	lastItem: false,
	  	items: ["Hot Chocolate"],
	},
	"Coffee:": {
		header: true,
	},
	"Cappuccino": {
	   	price: 150,
	   	noDiscount: false,
	   	lastItem: false,
	  	items: ["Cappuccino"],
	},
	"Espresso": {
	   	price: 150,
	   	noDiscount: false,
	   	lastItem: false,
	  	items: ["Espresso"],
	},
	// misc Items:
	"Misc": {
		header: true,	
	},
	"Cigarettes": {
	   	price: 140,
	   	noDiscount: false,
	   	lastItem: false,
	  	items: ["Cigarettes"],
	},
	"Cigarettes": {
	   	price: 140,
	   	noDiscount: false,
	   	lastItem: false,
	  	items: ["Cigarettes"],
	},
	"Noskit": {
	   	price: 140,
	   	noDiscount: false,
	   	lastItem: false,
	  	items: ["Noskit"],
	},
	"Lockpick": {
	   	price: 350,
	   	noDiscount: false,
	   	lastItem: false,
	  	items: ["Lockpick"],
	},
	"Adv Lockpick": {
	   	price: 2500,
	   	noDiscount: false,
	   	lastItem: false,
	  	items: ["Adv Lockpick"],
	},
	"Adv Repairkit": {
	   	price: 2500,
	   	noDiscount: false,
	   	lastItem: false,
	  	items: ["Adv Repairkit"],
	},
};
const INDIVIDUAL_ITEMS = [
	"Fruit Cube", "Cannoli", "Pain au Chocolate", "Meatball Sub", "Char Board", "Tropical Punch", "Frappuccino", "Grape Juicebox", "Hot Chocolate", "Cappuccino", "Espresso", "Cigarettes"
,"Noskit", "Lockpick", "Adv Lockpick", "Adv Repairkit"
];

const buttons = {
	"buffer": {
		html: '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp|&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'
	},
	"new_order": {
		html: '<div class="btn" onclick="newOrder();" title="Clear current order"><i class="fa fa-refresh" aria-hidden="true"></i> New Order</div>',
	},
	"set_combos": {
		html: '<div class="btn" onclick="toggleCombos()" title="Select current active combos"><i class="fa fa-cog" aria-hidden="true"></i> Combo Signs</div>',
	},
	"save": {
		html: '<div class="btn" onclick="updateSelected()" title="Save selected combos"><i class="fa fa-floppy-o" aria-hidden="true"></i> Back</div>',
	},
	"deselect_combos": {
		html: '<div class="btn" onclick="deselectCombos()" title="Deselect all combos"><i class="fa fa-times-circle-o" aria-hidden="true"></i> Deselect All</div>',
	}
};

const Signs = {
	"Welcome Sign": {
		copypasta:  '<font size=`80`><b>~g~ ~h~ Welcome to South Side Gas Station'
	},
	"Honk Service": {
		copypasta:  '<font size=`45`><b>~g~ ~h~ Honk for Service'
	},
	"Food&Combos": {
		copypasta:  '<font size=`35`><b>~b~ 🥙 ☕ Ask About Our Food & Combos!🥙☕'
	},
	"Tips Appreciated": {
		copypasta:  '<font size=`70`><b>~g~ 💸Tips Appreciated💸 '
	},
	"No parking": {
		copypasta:  '<font size=`70`><b>~g~ ~h~ 🚫NO PARKING🚫'
	},
	"Food Combos": {
		copypasta:  '<font size=`25`>~b~~g~Food~n~~b~ 🥝Fruit Cube~w~ |~o~ 100 ~n~ ~b~ 🍮Cannoli~w~ | ~o~ 100 ~n~ ~b~ 🍫Pain au Chocolate ~w~ |~o~ 100 ~n~~b~ 🥙Meatball Sub ~w~ |~o~ 100 ~n~~b~🍖Char. Board ~w~ |~o~ 100'
	},
	"Drinks": {
		copypasta:  '<font size=`25`> ~b~ ~g~Drinks ~n~~b~ 🍹Tropical Punch ~w~ |~o~ 100 ~n~ ~b~ ☕Frappuccino~w~ |~o~ 100~n~ ~b~ 🧃Grape Juicebox~w~ | ~o~ 100 ~n~  ~b~ 🍫Hot Chocolate ~w~ |~o~ 100'
	},
	"Coffees": {
		copypasta:  '<font size=`25`> ~b~ ~g~Coffee~n~ ~b~☕ Cappuccino ~w~ |~o~ 150 ~n~  ~b~ ☕Espresso ~w~ |~o~ 150'
	},
	"Misc": {
		copypasta:  '<font size=`25`>~g~Misc.~n~~b~🚬Cigarettes ~w~| ~o~140 ~n~~b~🩹NOSkit(MedKit) ~w~| ~o~140~n~ ~b~🧰Adv Repair Kits ~w~| ~o~2200'
	},
	"W cop combo": {
		copypasta:  '<font size=`25`>~r~ ~g~👮W COP COMBO ~n~ ~b~3 Any Food, 2 Grape Juicebox, 2 Espresso~w~ |~o~ $620'
	},
	"L cop combo": {
		copypasta:  '<font size=`25`>~r~ ~g~👮L COP COMBO ~n~ ~b~3 Any Food, 2 Hot Choc, 2 Capp., 1 Adv. Repair Kit~w~ |~o~ $2620'
	},
	"Cremepie combo": {
		copypasta:  '<font size=`25`>~r~ ~g~🍦CRÈMEPIE COMBO ~n~ ~b~3 Cannoli, 2 Hot Choc, 2 Capp., 2 MedKits~w~ |~o~ $820'
	},
	"Basic bish": {
		copypasta:  '<font size=`25`>~r~ ~g~🥱BASIC BISH~n~ ~b~1 Cannoli, 1 Frapp ~w~ |~o~ $120'
	},
	"Boost of the day": {
		copypasta:  '<font size=`25`>~g~🏎BOOST OF THE DAY~n~~b~1 Meatball Sub, 1 Trop. Punch, 5 Coffees ~w~| ~o~$950'
	},
	"Twatter Ad": {
		copypasta:  '☘️ South Side Gas ☘️ Come by and get ⛽ Premium gas ⛽☕🩹🥙 Food, Coffee, Cigs, First aids and ADV Repair Kits now available!☕🩹🥙 https://i.imgur.com/JHP67lY.mp4'
	}
};

const discounts = {
	
	"half_off": {
		percent: .50,
		desc: '50% Discount (PD, EMS, BS Employees...)',
	},
	"five_percent": {
		percent: .05,
		desc: '5% Discount (<font color="red">LIMITED TIME</font>)',
	},
	"blackout": {
		percent: .15,
		desc: 'Blackout Sale (15% off)',
	},
};

function getOccurrence(array, value) {
	return array.filter((v) => (v === value)).length;
}

function formatItems(items) {
	let newArray = [];
	let imageIcons = '';

	INDIVIDUAL_ITEMS.forEach(item => {
		let occ = getOccurrence(items, item);
		let imageName = item.toLowerCase().replace(' ', '_');
		let imageIcon = `<img src="images/${imageName}.png" title="${occ}x ${item}" width="30" height="30"> `
		if (occ > 0) newArray.push(`- ${occ}x ${imageIcon}${item}`);
	});

	return newArray;
}

function add(item) {
	let elem = document.getElementById(`${item}-#`);
	if (!elem) return alert(`ERROR: ${item} is not available to add to the cart!`);
	let number = Number(elem.innerText);
	elem.innerText = number + 1;
	report();
// 	let max = Menu[item].max || Settings.DEFAULT_MAX_CAP;
// 	if (number + 1 <= max) {
// 		elem.innerText = number + 1;
// 		report();
// 	} else {
// 		alert(`You cannot add more than ${max}x ${item} in 1 order!`);
// 	}
}

function remove(item) {
	let elem = document.getElementById(`${item}-#`);
	if (!elem) return alert(`ERROR: ${item} is not available to remove to the cart!`);
	let number = Number(elem.innerText);
	if (number - 1 >= 0) {
		elem.innerText = Number(number) - 1;
		report();
	}
}

function set(item, quantity) {
	let elem = document.getElementById(`${item}-#`);
	if (!elem) return alert(`ERROR: ${item} is not available in the cart!`);
	if (isNaN(Number(quantity))) {
		return alert(`ERROR: ${quantity} is not a number!`);
	}
	quantity = Math.round(Number(quantity));
// 	let max = Menu[item].max || Settings.DEFAULT_MAX_CAP;
// 	if (max && quantity > max) {
// 		alert(`You cannot add more than ${max}x ${item} in 1 order!`);
// 		return;
// 	}
	elem.innerText = quantity;
	report();
}

function editQuantity(item) {
	let currentQuantity = 0;
	let elem = document.getElementById(`${item}-#`);
	if (elem) currentQuantity = elem.innerText;
	let quantity = prompt(`Enter quantity for ${item}:`, currentQuantity);
	if (!quantity) return set(item, 0);
	set(item, quantity);
}

function getEmptyOrder() {
	let buffer = [];
	buffer.push('<img src="images/bs-logo.svg" width="45%">');
	buffer.push("");
	buffer.push("<strong>ITEMS ORDERED:</strong>");
	buffer.push("");
	buffer.push("");
	buffer.push("");
	buffer.push(`<strong>SUBTOTAL:</strong> <span class="green">$0</span>`);
	document.getElementById('reportBody').innerHTML = buffer.join("\n");
}

function getDiscount() {
	let discountCount = 0;
	let activeDiscount = 0;
	Object.keys(discounts).forEach(discount => {
		let checkBox = document.getElementById(`${discount}-DISCOUNT`);
		if (checkBox && checkBox.checked) {
			discountCount++;
			activeDiscount = discounts[discount].percent;
		}
	});
	if (discountCount > 1) return false;
	if (discountCount == 1) return activeDiscount;
	return "NONE";
}

function report() {
	let buffer = [];
	buffer.push('<img src="images/bs-logo.svg" width="45%">');
	buffer.push("");
	let curDarkmode = document.getElementById('darkmode').checked;
	if (curDarkmode) {
		if (darkmodeState === 'false') updateDarkmode();
	} else if (!curDarkmode) {
		if (darkmodeState === 'true') updateDarkmode();
	}
	let total = 0;
	let allItems = [];
	if (selectingCombos) return;
	let discountSelected = getDiscount();
	if (!discountSelected) {
		alert("You cannot have more than one sale/discount at once!");
		clearDiscounts();
	}

	Object.keys(Menu).forEach(item => {
		if (Menu[item].header) return;
		let selected = true;
		if (Menu[item].emoji) selected = isSelected(item);

		if (!selected) return;
		let discount = (Menu[item].noDiscount ? false : true);
		let price = Menu[item].price;
		if (discountSelected && discountSelected !== 'NONE' && !Menu[item].noDiscount) {
			console.log(discountSelected);
			price = price - Math.round(price * discountSelected);
		}
		let quantity = 0;
		quantity = document.getElementById(`${item}-#`).innerText;

		let items = Menu[item].items;
		total += price * quantity;
		if (quantity) {
			let count = 0;
			while (count < quantity) {
				count++;
				allItems = allItems.concat(items);
			}
		}
	});
	buffer.push("<strong>ITEMS ORDERED:</strong>");
	let formatted = formatItems(allItems.sort());
	buffer.push(formatted.join('\n'));
	buffer.push("");
	buffer.push("");
	buffer.push(`<strong>SUBTOTAL:</strong> <span class="green">$${total}</span>`);

	return document.getElementById('reportBody').innerHTML = buffer.join("\n");
}

// Listen for a click on the checkbox
function updateDarkmode() {
	// Then toggle (add/remove) the .dark-theme class to the body
	let darkmode = document.getElementById('darkmode').checked;
	if (darkmode) {
		localStorage.setItem("darkmode", true);
		darkmodeState = 'true';
	} else if (!darkmode) {
		localStorage.setItem("darkmode", false);
		darkmodeState = 'false';
	}
	document.body.classList.toggle('dark-theme');
}

function isSelected(comboName) {
	return true;
}

let selectingCombos = false;
let pageReloaded = false;

function updateSelected() {
	if (!selectingCombos) return;
	Object.keys(Menu).forEach(item => {
		if (!Menu[item].header && Menu[item].emoji) {
			let checked = document.getElementById(`${item}-SELECTED`).checked;
			localStorage.setItem(`${item}-SELECTED`, checked);
		}
	});
	toggleCombos();
	pageReloaded = true;
	loadPage();
	newOrder();
}

function toggleCombos() {
	selectingCombos = !selectingCombos;
	if (selectingCombos) {
		let buffer = `<table border="0"><tr><td colspan="${Settings.COMBO_TABLE_WIDTH}"><center><i> Combo Scene CopyPastas </i></center></td></tr><tr>`;
		let count = 0;
		Object.keys(Menu).forEach(item => {
			if (Menu[item].header || !Menu[item].emoji) return;
			let checked = (isSelected(item) ? "checked" : "");
			let tr = '';
			count++;
			if (count == Settings.COMBO_TABLE_WIDTH) {
				tr = `</tr><tr>`;
				count = 0;
			}
			buffer += `<td><button class="btn" type="checkbox" id="${item}-SELECTED" name="${item}-SELECTED" onclick="copypasta('`+ Menu[item].copypasta+ `')" value="${item}-SELECTED"/>` +
				`${Menu[item].emoji} ${item}</button></td>${tr}`;
				
		});
		for (let i = count; i < Settings.COMBO_TABLE_WIDTH; i++) {
			buffer += `<td></td>`;
		}
		buffer += `<table border="0"><tr><td colspan="${Settings.COMBO_TABLE_WIDTH}"><center><i> Signs CopyPastas </i></center></td></tr><tr>`;
		count = 0;
		Object.keys(Signs).forEach(item => {
			let tr = '';
			count++;
			if (count == Settings.COMBO_TABLE_WIDTH) {
				tr = `</tr><tr>`;
				count = 0;
			}
			buffer += `<td><button class="btn" type="checkbox" id="${item}-SELECTED" name="${item}-SELECTED" onclick="copypasta('`+ Signs[item].copypasta+ `')" value="${item}-SELECTED"/>` +
				`${item}</button></td>${tr}`;
				
		});
		buffer += `<tr><td colspan="${Settings.COMBO_TABLE_WIDTH}"><center>${buttons['save'].html}<br /></center></td></tr>`;
		buffer += `</table>`;

		document.getElementById('table').innerHTML = buffer;
		document.getElementById('action-buttons').innerHTML = '';
	} else {
		document.getElementById('table').innerText = '';
	}
}


function copypasta(item) {
	var copyText = document.getElementById("copypasta");
	item = item.replaceAll('`', '"');
	copyText.value = item;
	console.log(copyText.value);
 	navigator.clipboard.writeText(item);
	//alert(`Copied!`);
}


function getIcon(item) {
	if (!Menu[item].fileRenameException) {
		item = item.replace('Meal', '').replace('Combo', '').trim();
		console.log("item = " + item);
	}
	if (!Menu[item]) return;
	let icon;
	if (Menu[item].emoji) {
		icon = Menu[item].emoji;
	} else {
		let fileName = `${item.toLowerCase().replace(' ', '_')}.png`;
		console.log("fileName = " + fileName);
		icon = `<img src="images/${fileName}" width="20" height="20">`;
	}
	return icon;
}

function clearDiscounts() {
	Object.keys(discounts).forEach(discount => {
		let checkBox = document.getElementById(`${discount}-DISCOUNT`);
		if (checkBox) checkBox.checked = false;
	});
}

function newOrder() {
	Object.keys(Menu).forEach(item => {
		if (Menu[item].header) return;
		let selected = isSelected(item);
		if (Menu[item].emoji && !selected) return;
		document.getElementById(`${item}-#`).innerText = 0;
	});
	pageReloaded = true;
	clearDiscounts();
	report();
}

function deselectCombos() {
	Object.keys(Menu).forEach(item => {
		if (!Menu[item].emoji) return;
		let checkBox = document.getElementById(`${item}-SELECTED`);
		if (checkBox) checkBox.checked = false;
	});
}

function loadPage() {
	if (!pageReloaded) {
		let darkmodeSetting = localStorage.getItem("darkmode");
		if (!darkmodeSetting || darkmodeSetting === 'undefined' || darkmodeSetting === 'false') {
			localStorage.setItem("darkmode", false);
			darkmodeState = 'false';
		}
		if (darkmodeSetting == 'true') {
			document.getElementById('darkmode').checked = true;
			document.body.classList.toggle('dark-theme');
			darkmodeState = 'true';
		}
	}
	let table = '<table><tr>';
	let count = 0;
	Object.keys(Menu).forEach(item => {
		if (Menu[item].header) {
			for (let i = count; i < Settings.MAIN_TABLE_WIDTH; i++) {
				table += `<td></td>`;
			}
			table += `</tr><tr><td colspan="${Settings.MAIN_TABLE_WIDTH}"><center><strong><u>${item}</u></strong></center></td></tr><tr>`;
			count = 0;
		} else {
			let icon = getIcon(item);
			let comboName = item;
			if (comboName.includes("Combo") || comboName.includes("Meal")) {
				if (comboName !== 'Murder Meal') {
					comboName = comboName.replace(" Combo", "").replace(" Meal", "");
				}
			}
			if (Menu[item].emoji) {
				if (!isSelected(item)) return;
			} else {
				let fileName = `${comboName.toLowerCase().replace(' ', '_')}.png`;
			}
			let qty = 0;
			if (pageReloaded && (Menu[item].emoji && isSelected(item))) {
				let element = document.getElementById(`${item}-#`);
				if (element) qty = document.getElementById(`${item}-#`).innerText;
			}

			table += "<td class=\"itemBtn\"><center><button class=\"btn\" title='Add 1x " + item + "' onClick='add(\"" + item + "\")'><strong>" + icon + item + "</strong></button><br />" +
				`Qty: <strong><span id="${item}-#">${qty}</span></strong> | $${Menu[item].price} | ` +
				"<i class=\"fa fa-pencilfa fa-pencil-square\" aria-hidden=\"true\" title='Manually edit " + item + " quantity' onClick='editQuantity(\"" + item + "\")'></i> " +
				"<i class=\"fa fa-minus-circle\" aria-hidden=\"true\" title='Remove 1x " + item + "' onClick='remove(\"" + item + "\")'></i></td>";
			count++;
			if (count == Settings.MAIN_TABLE_WIDTH) {
				table += `</tr><tr>`
				count = 0;
			}
			if (Menu[item].lastItem) {
				for (let i = count; i < Settings.MAIN_TABLE_WIDTH; i++) {
					table += `<td></td>`;
				}
			}
		}
	});

	table += `</tr><tr><td colspan="${Settings.MAIN_TABLE_WIDTH}">`
	Object.keys(discounts).forEach(discount => {
		table += `<input type="checkbox" id="${discount}-DISCOUNT" name="${discount}-DISCOUNT" value="${discount}-DISCOUNT" />` +
			`<label for="${discount}-DISCOUNT">${discounts[discount].desc}</label><br />`;
	});
	table += `</td></tr></table>`;

	document.getElementById('table').innerHTML = table;

	let activeButtons = `${buttons['buffer'].html}${buttons['new_order'].html}`;
	if (!selectingCombos) activeButtons += ` | ${buttons['set_combos'].html}`;
	document.getElementById('action-buttons').innerHTML = activeButtons;

	if (!pageReloaded) getEmptyOrder();

	let inputs = document.querySelectorAll('input[type="text"], input[type="number"], textarea');
	inputs.forEach(i => i.addEventListener('keyup', report, false));

	let checkboxes = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
	checkboxes.forEach(i => i.addEventListener('click', report, false));
}
