package com.example.application.mob1;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.TextView;

public class Home extends AppCompatActivity {

    private TextView resultText;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(com.example.application.mob1.R.layout.home);
        resultText = (TextView) findViewById(com.example.application.mob1.R.id.tv);
    }

    public void logout(View v)
    {
        Intent i = new Intent(Home.this,MainActivity.class);

        startActivity(i);
    }







}
