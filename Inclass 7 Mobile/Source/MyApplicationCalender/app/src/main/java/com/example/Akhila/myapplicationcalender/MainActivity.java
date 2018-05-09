package com.example.Akhila.myapplicationcalender;

import android.os.Build;
import android.support.annotation.RequiresApi;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import java.util.GregorianCalendar;



import android.os.Bundle;

import android.provider.CalendarContract;

import android.provider.CalendarContract.Events;

import android.widget.CalendarView;

import android.widget.CalendarView.OnDateChangeListener;

import android.app.Activity;

import android.content.Intent;

import com.example.snehadidigam.myapplicationcalender.R;

public class MainActivity extends AppCompatActivity {
    CalendarView calendar;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initializeCalendar();

    }

    public void initializeCalendar() {

        calendar = (CalendarView) findViewById(R.id.calendar);


        // sets whether to show the week number.

        calendar.setShowWeekNumber(false);


        // sets the first day of week according to Calendar.

        // here we set Monday as the first day of the Calendar

        calendar.setFirstDayOfWeek(2);


        // The background color for the selected week.

        calendar.setSelectedWeekBackgroundColor(getResources().getColor(

                R.color.green));


        // sets the color for the dates of an unfocused month.

        calendar.setUnfocusedMonthDateColor(getResources().getColor(

                R.color.transparent));


        // sets the color for the separator line between weeks.

        calendar.setWeekSeparatorLineColor(getResources().getColor(

                R.color.transparent));


        // sets the color for the vertical bar shown at the beginning and      //  at the end of the selected date.

        calendar.setSelectedDateVerticalBar(R.color.darkgreen);


        // sets the listener to be notified upon selected date change.

        calendar.setOnDateChangeListener(new OnDateChangeListener() {


            // show the selected date as a toast

            @Override

            public void onSelectedDayChange(CalendarView view, int year,

                                            int month, int day) {

                Intent calIntent = new Intent(Intent.ACTION_INSERT);

                calIntent.setType("vnd.android.cursor.item/event");

//                calIntent.putExtra(Events.TITLE, "My BirthDay Party");
//
//                calIntent.putExtra(Events.EVENT_LOCATION, "My City");
//
//                calIntent.putExtra(Events.DESCRIPTION, "My 22th birthday");


                GregorianCalendar calDate = new GregorianCalendar(year, month, day);

                calIntent.putExtra(CalendarContract.EXTRA_EVENT_ALL_DAY, true);

                calIntent.putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME,

                        calDate.getTimeInMillis());

                calIntent.putExtra(CalendarContract.EXTRA_EVENT_END_TIME,

                        calDate.getTimeInMillis());


                startActivity(calIntent);


            }

        });

    }
}
