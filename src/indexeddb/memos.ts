import Dexie from 'dexie'
// IndexedDB に保存するデータの型を定義します。
export interface MemoRecord{
  datetime: string
  title: string
  text: string
}
// Dexie のインスタンスを生成
const database = new Dexie('markdown-editor')
// .stores() で使用するテーブルとインデックスとなるデータ名を指定
database.version(1).stores({ memos: '&datetime' })
// MemoRecordは保存データの型、stringはindex(dattetimeの型)
// データを扱うテーブルクラスを取得します。
const memos: Dexie.Table<MemoRecord, string> = database.table('memos')

export const putMemo = async (title: string, text: string): Promise<void> => {
  // ISO8601形式は日時の国際規格
  const datetime = new Date().toISOString()
  await memos.put({ datetime, title, text })
}