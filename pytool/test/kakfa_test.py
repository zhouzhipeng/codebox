from kafka import KafkaConsumer
from kafka import TopicPartition
import json

brokers = "kafka-log1.qa1fdg.net:9092,kafka-log2.qa1fdg.net:9092,kafka-log3.qa1fdg.net:9092"
topic = "ecslogs"
partition = 49
offset = 26952878462

consumer = KafkaConsumer(bootstrap_servers=brokers.split(","),
                         consumer_timeout_ms=1000)
partition = TopicPartition(topic=topic, partition=partition)
consumer.assign([partition])
consumer.seek(partition, offset )
for msg in consumer:
    s = str(msg)
    for line in s.split(","):
        print(line)
    break