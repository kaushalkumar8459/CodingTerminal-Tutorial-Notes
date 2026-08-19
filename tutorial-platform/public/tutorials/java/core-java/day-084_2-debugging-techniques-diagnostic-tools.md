---
title: Debugging Techniques and Diagnostic Tools
slug: day-084_2-debugging-techniques-diagnostic-tools
dayLabel: Day 84_2
level: Advanced
estimatedMinutes: 50
order: 84
track: java
---
# Day 84 [Advanced]: Debugging Techniques and Diagnostic Tools

## Index

- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Explanation](#explanation)
- [Topic by Topic](#topic-by-topic)
- [Key Concepts](#key-concepts)
- [Hands-on Coding](#hands-on-coding)
- [Mini Exercise](#mini-exercise)
- [Assessment Quiz](#assessment-quiz)
- [Task](#task)
- [Day 84 Outcome](#day-84-outcome)

## Goal

Master systematic debugging approaches and use IDE and JVM tools to find and fix bugs efficiently.

## Prerequisites

- Day 83: Thread Dump Analysis and Deadlock Diagnostics
- Day 52: Logging with SLF4J and Logback
- Day 44: Multithreading Basics

## Explanation

Debugging is the process of finding and fixing defects in code. Effective debugging saves hours of frustration.

There are three main debugging approaches:
1. **IDE Debugging**: Step through code with breakpoints (IntelliJ, Eclipse, VS Code)
2. **Logging**: Add logging statements to understand execution flow
3. **Remote Debugging**: Debug running processes on remote servers
4. **JVM Diagnostics**: Use jstack, jmap, jcmd, async-profiler to analyze runtime behavior

Systematic debugging means:
1. Reproduce the bug consistently
2. Narrow down where it occurs
3. Form a hypothesis
4. Test the hypothesis
5. Fix and verify

## Topic by Topic

### Topic 1: IDE Breakpoint Debugging

Theory:
IDEs like IntelliJ IDEA and Eclipse provide powerful debuggers. Set breakpoints to pause execution, then inspect variables and step through code.

Key concepts:
- Breakpoint: pause point in code
- Step over: execute current line
- Step into: enter method call
- Step out: exit current method
- Conditional breakpoint: break only if condition is true
- Watch expressions: monitor variable changes

Practical:
Use IDE debugger to understand code flow.

```java
public class DebugExample {
    public static void main(String[] args) {
        int[] numbers = {5, 2, 8, 1, 9};
        int max = findMax(numbers);
        System.out.println("Max: " + max);
    }
    
    public static int findMax(int[] array) {
        int max = array[0];  // SET BREAKPOINT HERE
        for (int i = 1; i < array.length; i++) {  // STEP OVER HERE
            if (array[i] > max) {
                max = array[i];  // WATCH: max variable
            }
        }
        return max;  // STEP OUT HERE
    }
}
```

### Topic 2: Effective Logging for Debugging

Theory:
Logging is less intrusive than breakpoints and works in production. Use appropriate log levels:
- DEBUG: detailed flow information
- INFO: high-level events
- WARN: potentially problematic
- ERROR: errors that need attention

Structure logs with context (class, method, parameters) for easier troubleshooting.

Practical:
Log strategically to understand execution flow.

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BankTransfer {
    private static final Logger logger = LoggerFactory.getLogger(BankTransfer.class);
    
    public void transfer(Account from, Account to, BigDecimal amount) {
        logger.info("Transfer initiated: {} -> {} amount={}", 
            from.getId(), to.getId(), amount);
        
        try {
            logger.debug("Checking balance for account {}", from.getId());
            if (from.getBalance().compareTo(amount) < 0) {
                logger.warn("Insufficient funds in account {}", from.getId());
                throw new InsufficientFundsException();
            }
            
            logger.debug("Withdrawing {} from {}", amount, from.getId());
            from.withdraw(amount);
            
            logger.debug("Depositing {} to {}", amount, to.getId());
            to.deposit(amount);
            
            logger.info("Transfer completed successfully: {} -> {} amount={}", 
                from.getId(), to.getId(), amount);
        } catch (Exception e) {
            logger.error("Transfer failed: {} -> {} amount={}", 
                from.getId(), to.getId(), amount, e);
            throw e;
        }
    }
}
```

### Topic 3: Remote Debugging and Production Issues

Theory:
Production systems can't be debugged with IDE breakpoints. Use remote debugging to attach IDE to running JVM.

Start JVM with debugging flags:
```bash
java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005 MyApp
```

Then connect IDE to port 5005.

Practical:
Debug issues in production-like environments.

In IDE (IntelliJ):
1. Run → Edit Configurations
2. Add Remote JVM Debug
3. Set host and port
4. Click Debug

### Topic 4: Heap Dumps and Memory Analysis

Theory:
Memory leaks cause OutOfMemoryError. Heap dumps show which objects are consuming memory.

Generate heap dump:
```bash
jmap -dump:live,format=b,file=heap.hprof <pid>
```

Analyze with Eclipse MAT (Memory Analyzer Tool) or jhat.

Practical:
Identify memory leaks systematically.

```bash
# Get Java process ID
jps -l

# Generate heap dump
jmap -dump:live,format=b,file=myapp.hprof 12345

# Analyze with jhat
jhat -J-Xmx1024m myapp.hprof
# Then open browser to http://localhost:7000
```

### Topic 5: JVM Diagnostic Commands

Theory:
Commands like jcmd, jstack, jstat provide runtime insights without stopping the application.

Key commands:
- `jcmd <pid> help`: list available commands
- `jcmd <pid> Thread.print`: print all threads (like jstack)
- `jcmd <pid> GC.heap_dump filename=heap.hprof`: heap dump
- `jstat -gc <pid> 1000`: GC statistics every 1 second
- `jcmd <pid> VM.log`: manage logging

Practical:
Diagnose running system without restarts.

```bash
# List Java processes
jps -l

# Print all threads and locks
jcmd 12345 Thread.print > threads.txt

# Monitor GC in real-time
jstat -gc -h10 12345 1000

# Get heap info
jcmd 12345 VM.heap_info

# Start JFR recording
jcmd 12345 JFR.start name=myrecording duration=60s
jcmd 12345 JFR.stop name=myrecording filename=myrecording.jfr
```

## Key Concepts

- Breakpoints and stepping (over, into, out)
- Conditional breakpoints and watch expressions
- Log levels and structured logging
- Remote debugging with JDWP
- Heap dumps and memory analysis
- Thread dumps and deadlock analysis
- JVM diagnostic commands (jcmd, jstack, jmap, jstat)
- Production debugging strategies
- Root cause analysis methodology

## Hands-on Coding

Comprehensive debugging scenario:

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DebuggableApplication {
    private static final Logger logger = LoggerFactory.getLogger(DebuggableApplication.class);
    
    // Potential issues to debug:
    // 1. NullPointerException
    // 2. Infinite loop
    // 3. Memory leak
    // 4. Thread deadlock
    
    public void processOrder(Order order) {
        logger.info("Processing order: {}", order.getId());
        
        try {
            // Add logging at key points
            logger.debug("Validating order");
            if (!validateOrder(order)) {
                logger.warn("Order validation failed: {}", order.getId());
                return;
            }
            
            logger.debug("Checking inventory");
            reserveInventory(order);
            
            logger.debug("Processing payment");
            processPayment(order);
            
            logger.info("Order processed successfully: {}", order.getId());
        } catch (Exception e) {
            logger.error("Order processing failed: {}", order.getId(), e);
            // Include context in error logs for easier debugging
            logger.error("Failed order state: customer={}, total={}", 
                order.getCustomerId(), order.getTotal());
        }
    }
    
    private boolean validateOrder(Order order) {
        // Set breakpoint here to inspect order details
        return order != null && order.getTotal().signum() > 0;
    }
    
    private void reserveInventory(Order order) {
        // Potential: loop forever if inventory service hangs
        // Set timeout with watch expression
    }
    
    private void processPayment(Order order) {
        // Potential: NullPointerException if payment processor is null
        // Breakpoint with conditional: payment == null
    }
}
```

## Mini Exercise

Given this buggy code, use the debugger or logging to find and fix the issue:

```java
public class BuggyCalculator {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5};
        System.out.println("Average: " + calculateAverage(numbers));
    }
    
    public static double calculateAverage(int[] numbers) {
        int sum = 0;
        for (int i = 0; i <= numbers.length; i++) {  // BUG: i <= should be i <
            sum += numbers[i];
        }
        return sum / numbers.length;  // BUG: integer division
    }
}
```

Set breakpoints and step through to identify issues, then add logging to verify fix.

## Assessment Quiz

1. What's the difference between "Step Over" and "Step Into" in a debugger?
2. How do you attach an IDE debugger to a running JVM?
3. What log level should you use for business events you want to track in production?
4. How do you generate a heap dump from a running Java process?

Answers:

1. Step Over executes the current line; Step Into enters method calls
2. Start JVM with -agentlib:jdwp flags, then connect IDE to the port
3. INFO level for business events, DEBUG for detailed flow
4. `jmap -dump:live,format=b,file=heap.hprof <pid>`

## Task

1. Set up remote debugging in your IDE for a running application
2. Create a logging strategy that would help debug: login failures, payment issues, and slow queries
3. Generate and analyze a heap dump from a Java application

## Day 84 Outcome

You can systematically debug Java applications using IDE breakpoints, logging, remote debugging, and JVM diagnostic tools. You understand memory and thread issues and how to collect data for root cause analysis.
