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
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.adds.aiwealthmanager.ui.theme.DeepGreen
import com.adds.aiwealthmanager.ui.theme.LimeGreen
import com.adds.aiwealthmanager.ui.theme.NavyBlue
import com.adds.aiwealthmanager.ui.theme.Star4
import com.adds.aiwealthmanager.ui.theme.poppinsFontFamily
import java.time.LocalDateTime

@Composable
fun Homepage(navController: NavController) {
    val currentTime = LocalDateTime.now()
    val hour = currentTime.hour

    val greeting = when(hour) {
        in 0..11 -> "Good Morning"
        12 -> "Good Noon"
        in 13..17 -> "Good Afternoon"
        else -> "Good Night"
    }

    MaterialTheme{
        Surface(modifier = Modifier.fillMaxSize(),
            color = DeepGreen) {
            Star4()
            Column(modifier = Modifier.padding(10.dp),
                horizontalAlignment = Alignment.CenterHorizontally) {

                Spacer(modifier = Modifier.height(10.dp))

                Row(horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.fillMaxWidth()) {

                    NotificationButton { navController.navigate("notification") }

                    Text(text = "Dashboard",
                        color = Color.White,
                        fontFamily = poppinsFontFamily,
                        fontWeight = FontWeight.SemiBold,
                        fontSize = 22.sp)

                    UserButton {
                        navController.navigate("profile")
                    }
                }

                Spacer(modifier = Modifier.height(50.dp))

                Text(text = greeting,
                    color = Color.White,
                    fontFamily = poppinsFontFamily,
                    fontWeight = FontWeight.Bold,
                    fontSize = 26.sp)

                Text(text = "USER",
                    color = LimeGreen,
                    fontFamily = poppinsFontFamily,
                    fontWeight = FontWeight.SemiBold,
                    fontSize = 36.sp)

                Spacer(modifier = Modifier.height(50.dp))

                Text(text = "Here is your today's expenditure",
                    color = NavyBlue,
                    fontFamily = poppinsFontFamily,
                    fontWeight = FontWeight.SemiBold,
                    fontSize = 20.sp)
            }
        }
    }
}

@Composable
fun NotificationButton(onClick: () -> Unit) {
    IconButton(onClick = onClick) {
        Icon(
            imageVector = Icons.Default.Notifications,
            contentDescription = "Notification",
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
            contentDescription = "Profile",
            tint = Color.White,
            modifier = Modifier.size(50.dp)
        )
    }
}
