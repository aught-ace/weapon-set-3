'use strict'

// 要素を取得
const typeRadio = document.querySelectorAll('.type-filter input[type="radio"]');
const subRadio = document.querySelectorAll('.sub-filter input[type="radio"]');
const specialRadio = document.querySelectorAll('.special-filter input[type="radio"]');
const allRadio = document.querySelector('#all');
const weaponSetDiv = document.querySelectorAll('.weapon-set');
const mainButton = document.querySelectorAll('.weapon-set .main');
const subButton = document.querySelectorAll('.weapon-set .sub');
const specialButton = document.querySelectorAll('.weapon-set .special');
const nameButton = document.querySelectorAll('.weapon-set .name');
const searchText = document.querySelector('#search');
const descriptionDiv = document.querySelector('#description');
const descriptionStoreDiv = document.querySelector('#description-store');
const glassDiv = document.querySelector('#glass');

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
    
    // 検索
    weaponSetDiv.forEach((w) => {
        removeClass(w, 'none');
        let v = true; // ブキセットが見えるかどうかのフラグ

        const m = w.querySelector('.main');
        if(t != null && m.dataset.type !== t.id) v = false;

        const i = w.querySelector('.sub img');
        if(b != null && !i.src.includes(b.id)) v = false;

        const j = w.querySelector('.special img');
        if(p != null && !j.src.includes(p.id)) v = false;

        const n = w.querySelector('.name');
        if(s !== '' && !n.textContent.includes(s)) v = false;

        if(!v) addClass(w, 'none');
    });
;}

// タイプのラジオボタンに設定
typeRadio.forEach((r) => {
    r.addEventListener('change', (e) => {
        if (e.target.checked) {
            searchText.value = '';
            update();
        }
    });
});
// サブのラジオボタンに設定
subRadio.forEach((r) => {
    r.addEventListener('change', (e) => {
        if (e.target.checked) {
            searchText.value = '';
            update();
        }
    });
});
// スペシャルのラジオボタンに設定
specialRadio.forEach((r) => {
    r.addEventListener('change', (e) => {
        if (e.target.checked) {
            searchText.value = '';
            update();
        }
    });
});

// すべて表示のラジオボタンに設定
allRadio.addEventListener('change', (e) => {
    if (e.target.checked) {
        searchText.value = '';
        update();
    }
});

// サーチのテキストに設定
searchText.addEventListener('input', (e) => {
    const t = document.querySelector('.type-filter input[type="radio"]:checked');
    const b = document.querySelector('.sub-filter input[type="radio"]:checked');
    const p = document.querySelector('.special-filter input[type="radio"]:checked');
    
    // 検索中ならラジオボタンを全チェック外し
    if(e.target.value !== '') {
        if(t != null) t.checked = false;
        if(b != null) b.checked = false;
        if(p != null) p.checked = false;
        allRadio.checked = false;
    } else {
        allRadio.checked = true;
    }

    update();
});

// ブキ一覧のメインのボタンに設定
mainButton.forEach((b) => {
    b.addEventListener('click', (e) => {
        if(descView) return;
        const m = b.dataset.type;
        typeRadio.forEach((r) => {
            if(r.id === m) r.click();
        });
        window.scroll(0, 0);
    });
});
// ブキ一覧のサブのボタンに設定
subButton.forEach((b) => {
    b.addEventListener('click', (e) => {
        if(descView) return;
        const i = b.querySelector('img');
        const n = i.src.match(/\/([\w-]+?)\.PNG/);
        if(n == null) return;
        const m = n[1];
        subRadio.forEach((r) => {
            if(r.id === m) r.click();
        });
        window.scroll(0, 0);
    });
});
// ブキ一覧のスペシャルのボタンに設定
specialButton.forEach((b) => {
    b.addEventListener('click', (e) => {
        if(descView) return;
        const i = b.querySelector('img');
        const n = i.src.match(/\/([\w-]+?)\.PNG/);
        if(n == null) return;
        const m = n[1];
        specialRadio.forEach((r) => {
            if(r.id === m) r.click();
        });
        window.scroll(0, 0);
    });
});

let descView = false; // 説明を表示しているかのフラグ

// ブキセット説明用のオブジェクト生成
const descStoreDiv = descriptionStoreDiv.querySelectorAll('div');
const weapon = {};
descStoreDiv.forEach((d) => {
    const h2 = d.querySelector('h2');
    const p = d.querySelector('p');
    weapon[h2.textContent] = p.innerHTML;
});

// スクロール禁止用コールバック
function noscroll(e) {
    //e.preventDefault();
};
function noMiddleButton(e) {
    //if(e.button === 1) e.preventDefault();
};

// 名前のボタンにイベント設定
nameButton.forEach((b) => {
    b.addEventListener('click', (e) => {
        if(descView) return false;
        const n = b.textContent;
        const mi = b.parentElement.querySelector('.main img');
        const sbi = b.parentElement.querySelector('.sub img');
        const sbn = sbi.alt;
        const spi = b.parentElement.querySelector('.special img');
        const spn = spi.alt;

        const descMainImg = descriptionDiv.querySelector('.main img');
        const descSubImg = descriptionDiv.querySelector('.sub img');
        const descSpecialImg = descriptionDiv.querySelector('.special img');
        const descMainH2 = descriptionDiv.querySelector('.main h2');
        const descSubH2 = descriptionDiv.querySelector('.sub h2');
        const descSpecialH2 = descriptionDiv.querySelector('.special h2');
        const descMainP = descriptionDiv.querySelector('.main p');
        const descSubP = descriptionDiv.querySelector('.sub p');
        const descSpecialP = descriptionDiv.querySelector('.special p');

        descMainImg.src = mi.src;
        descSubImg.src = sbi.src;
        descSpecialImg.src = spi.src;
        descMainH2.textContent = n;
        descSubH2.textContent = sbn;
        descSpecialH2.textContent = spn;
        descMainP.innerHTML = weapon[n];
        descSubP.innerHTML = weapon[sbn];
        descSpecialP.innerHTML = weapon[spn];
        
        document.addEventListener('mousedown', noMiddleButton, {passive: false});
        document.addEventListener('touchmove', noscroll, {passive: false});
        document.addEventListener('wheel', noscroll, {passive: false});
        descriptionDiv.className = '';
        document.body.className = 'desc';
        descView = true;

        e.preventDefault();
        e.stopPropagation();
        return false;
    });
});

// 説明欄外を押して戻る
document.addEventListener('click', (e) => {
    if(descView) {
        descriptionDiv.className = 'none';
        document.body.className = '';
        document.removeEventListener('mousedown', noMiddleButton);
        document.removeEventListener('touchmove', noscroll);
	    document.removeEventListener('wheel', noscroll);
        descView = false;
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
});

// 説明欄を押しても何も起こらない
descriptionDiv.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
});

update();