package com.umkc.android_sqlite.db;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import com.umkc.android_sqlite.model.Contact;


public class SQLiteDB extends SQLiteOpenHelper {


    public static final int DATABASE_VERSION = 1;
    public static final String DATABASE_NAME = "Contact.db";


    public static final String TABLE_NAME = "contact";
    public static final String COLUMN_ID = "contact_id";
    public static final String COLUMN_NAME = "contact_name";
    public static final String COLUMN_PHONE = "contact_phone";


    private static final String SQL_DELETE_ENTRIES =
            "DROP TABLE IF EXISTS " + TABLE_NAME;

    public SQLiteDB(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {

        //fill this method to create the database table
        // use the constants provided above
        String CREATE_TABLE =
                "CREATE TABLE " + TABLE_NAME + "("
                        + COLUMN_ID + " INTEGER PRIMARY KEY AUTOINCREMENT,"
                        + COLUMN_NAME + " TEXT,"
                        + COLUMN_PHONE + " INTEGER "
                        + ")";
        db.execSQL(CREATE_TABLE);

    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL(SQL_DELETE_ENTRIES);
        onCreate(db);
    }

    public void onDowngrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        onUpgrade(db, oldVersion, newVersion);
    }

    public void create(Contact contact){
        //fill this method to insert the row
        ContentValues initialValues = new ContentValues();
        initialValues.put(COLUMN_ID, contact.getId());
        initialValues.put(COLUMN_NAME, contact.getName());
        initialValues.put(COLUMN_PHONE, contact.getPhone());

        SQLiteDatabase db = getWritableDatabase();
        db.insert(TABLE_NAME, null, initialValues);

    }

    public Cursor retrieve(){
        SQLiteDatabase db = getReadableDatabase();
        String[] cols = {
                COLUMN_ID,
                COLUMN_NAME,
                COLUMN_PHONE };

        String sortOrder = COLUMN_NAME + " ASC";

        Cursor c = db.query(
                TABLE_NAME,                    // The table to query
                cols,                                 // The columns to return
                null,                                       // The columns for the WHERE clause
                null,                                       // The values for the WHERE clause
                null,                                       // don't group the rows
                null,                                       // don't filter by row groups
                sortOrder                                   // The sort order
        );

        return c;
    }

    public void update(Contact contact){

        //fill this method to update the row

        int id = contact.getId();
        ContentValues args = new ContentValues();
        args.put(COLUMN_ID, contact.getId());
        args.put(COLUMN_NAME, contact.getName());
        args.put(COLUMN_PHONE, contact.getPhone());

        SQLiteDatabase db = getWritableDatabase();

        db.update(TABLE_NAME, args, COLUMN_ID +"="+id, null);

    }

    public void delete(int id){

        //fill this method to delete the row
        SQLiteDatabase db = getWritableDatabase();

        db.delete(TABLE_NAME, COLUMN_ID+"="+id,null);

    }
}
