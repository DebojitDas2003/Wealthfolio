package com.adds.aiwealthmanager

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountCircle
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Notifications
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.adds.aiwealthmanager.ui.theme.DeepGreen
import com.adds.aiwealthmanager.ui.theme.poppinsFontFamily

@Composable
fun Homepage() {
    MaterialTheme{
        Surface(modifier = Modifier.fillMaxSize(),
            color = DeepGreen) {
            Column(modifier = Modifier.padding(10.dp)) {

                Spacer(modifier = Modifier.height(10.dp))

                Row(horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.fillMaxWidth()) {

                    NotificationButton {

                    }

                    Text(text = "Dashboard",
                        color = Color.White,
                        fontFamily = poppinsFontFamily,
                        fontWeight = FontWeight.SemiBold,
                        fontSize = 22.sp)

                    UserButton {

                    }




                }






            }
        }
    }
}


@Composable
fun NotificationButton(onClick: () -> Unit) {
    IconButton(onClick = onClick) {
        Icon(
            imageVector = Icons.Default.Notifications,
            contentDescription = "Previous",
            tint = Color.White,
            modifier = Modifier.size(50.dp)
        )
    }
}

@Composable
fun UserButton(onClick: () -> Unit) {
    IconButton(onClick = onClick) {
        Icon(
            imageVector = Icons.Default.AccountCircle,
            contentDescription = "Previous",
            tint = Color.White,
            modifier = Modifier.size(50.dp)
        )
    }
}

@Preview
@Composable
fun HomepageDemo() {
    Homepage()
}