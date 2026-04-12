'use strict'

// 要素を取得
const typeRadio = document.querySelectorAll('.type-filter input[type="radio"]');
const subRadio = document.querySelectorAll('.sub-filter input[type="radio"]');
const specialRadio = document.querySelectorAll('.special-filter input[type="radio"]');
const weaponSet = document.querySelectorAll('.weapon-set');
const mainButton = document.querySelectorAll('.main');
const subButton = document.querySelectorAll('.sub');
const specialButton = document.querySelectorAll('.special');
const nameButton = document.querySelectorAll('.name');
const searchText = document.querySelector('#search');
const clearButton = document.querySelector('#clear');

// 要素にクラスを追加、削除
const addClass = (e, c) => {
    if(!e.classList.contains(c)) e.classList.add(c);
};
const removeClass = (e, c) => {
    if(e.classList.contains(c)) e.classList.remove(c);
};

// 表示更新ボタン
const update = () => {
    const t = document.querySelector('.type-filter input[type="radio"]:checked');
    const b = document.querySelector('.sub-filter input[type="radio"]:checked');
    const p = document.querySelector('.special-filter input[type="radio"]:checked');
    const s = searchText.value;

    // サーチボタンを薄くする
    if(s !== '') clearButton.className = 'thin'; else clearButton.className = '';
    
    // 検索
    weaponSet.forEach((w) => {
        removeClass(w, 'none');
        let v = true;

        const m = w.querySelector('.main');
        if(t.id !== 'all' && m.dataset.type !== t.id) v = false;

        const i = w.querySelector('.sub img');
        if(b.id !== 'all' && !i.src.includes(b.id)) v = false;

        const j = w.querySelector('.special img');
        if(p.id !== 'all' && !j.src.includes(p.id)) v = false;

        const n = w.querySelector('.name');
        if(s !== '' && !n.textContent.includes(s)) v = false;

        if(!v) addClass(w, 'none');
    });
;}

// タイプのラジオボタンに設定
typeRadio.forEach((r) => {
    r.addEventListener('change', (e) => {
        if (e.target.checked) {
            update();
        }
    });
});

// サブのラジオボタンに設定
subRadio.forEach((r) => {
    r.addEventListener('change', (e) => {
        if (e.target.checked) {
            update();
        }
    });
});

// スペシャルのラジオボタンに設定
specialRadio.forEach((r) => {
    r.addEventListener('change', (e) => {
        if (e.target.checked) {
            update();
        }
    });
});

// サーチのテキストに設定
searchText.addEventListener('input', (e) => {
    update();
});

// サーチのテキストのクリアボタン
clearButton.addEventListener('click', (e) => {
    searchText.value = '';
    update();
});

// メインのボタンに設定
mainButton.forEach((b) => {
    b.addEventListener('click', (e) => {
        const m = b.dataset.type;
        typeRadio.forEach((r) => {
            if(r.id === m) r.click();
        });
    });
});

// サブのボタンに設定
subButton.forEach((b) => {
    b.addEventListener('click', (e) => {
        const i = b.querySelector('img');
        const n = i.src.match(/\/([\w-]+?)\.PNG/);
        if(n == null) return;
        const m = n[1];
        subRadio.forEach((r) => {
            if(r.id === m) r.click();
        });
    });
});

// スペシャルのボタンに設定
specialButton.forEach((b) => {
    b.addEventListener('click', (e) => {
        const i = b.querySelector('img');
        const n = i.src.match(/\/([\w-]+?)\.PNG/);
        if(n == null) return;
        const m = n[1];
        specialRadio.forEach((r) => {
            if(r.id === m) r.click();
        });
    });
});

// 名前のボタンに設定
nameButton.forEach((b) => {
    b.addEventListener('click', (e) => {
        const t = b.textContent;
        specialRadio.forEach((r) => {
            searchText.value = t;
            update();
        });
    });
});

update();